const { isWithinTimeWindow, generateID } = require('../utils/index.js');
const dataSources = require('../data.js');

module.exports = {
  Query: {
    apps: () => dataSources.apps,
    stages: () => dataSources.stages,
    events: (parent, args) => {
      let { start, end } = args;
      if (!start && !end) { return dataSources.events }
      return dataSources.events.filter(event => isWithinTimeWindow(start, end, event.startsAt, event.endsAt));
    },
    app: (parent, args) => dataSources.apps.filter(app => app.name === args.name)[0],
    stage: (parent, args) => dataSources.stages.filter(stage => stage.name === args.name)[0],
    event: (parent, args) => dataSources.events.filter(event => event.name === args.name)[0]
  },

  Mutation: {
    addStage: (parent, args) => {
      const ID = generateID(args.name);
      const newStage = { id: ID, name: args.name };
      const stageAlreadyExists = dataSources.stages.filter(stage => stage.name === newStage.name).length > 0;
      if (stageAlreadyExists) { return };
      dataSources.stages.push(newStage);
      return newStage;
    },
    updateStage: (parent, args) => {
      for (let i = 0; i < dataSources.stages.length; i++) {
        if (dataSources.stages[i].id === args.id) {
          dataSources.stages[i] = {
            ...dataSources.stages[i],
            ...args
          };
          return dataSources.stages[i];
        }
      }
      return;
    },
    removeStage: (parent, args) => {
      const paramName = args.id ? 'id' : 'name';
      for (let i = 0; i < dataSources.stages.length; i++) {
        if (dataSources.stages[i][paramName] === args[paramName]) {
          let removedStage = dataSources.stages[i];
          dataSources.stages.splice(i, 1);
          return removedStage;
        }
      }
      return;
    },

    addEvent: (parent, args) => {
      const ID = generateID(args.name);
      const newEvent = { id: ID, ...args };
      const eventAlreadyExists = dataSources.events.filter(event => event.id === newEvent.id).length > 0;
      if (eventAlreadyExists) { return };
      dataSources.events.push(newEvent);
      return newEvent;
    },
    updateEvent: (parent, args) => {
      for (let i = 0; i < dataSources.events.length; i++) {
        if (dataSources.events[i].id === args.id) {
          dataSources.events[i] = {
            ...dataSources.events[i],
            ...args
          };
          return dataSources.events[i];
        }
      }
      return;
    },
    removeEvent: (parent, args) => {
      for (let i = 0; i < dataSources.events.length; i++) {
        if (dataSources.events[i].id === args.id) {
          let removedEvent = dataSources.events[i];
          dataSources.events.splice(i, 1);
          return removedEvent;
        }
      }
      return;
    }
  },

  App: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    events: (parent, args) => {
      let { start, end } = args;
      if (!start && !end) { return dataSources.events.filter(event => event.appId === parent.id) }
      return dataSources.events.filter(event => event.appId === parent.id && isWithinTimeWindow(start, end, event.startsAt, event.endsAt));
    },
    stages: (parent) => {
      let stageIDs = {};
      for (let event of dataSources.events) {
        // checks to make sure the event we are pulling the stageId from is for the current app
        if (event.appId === parent.id)
          stageIDs[event.stageId] = true;
      }
      return dataSources.stages.filter(stage => stageIDs[stage.id])
    }
  },

  Stage: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    events: (parent, args) => {
      let { start, end } = args;
      if (!start && !end) { return dataSources.events.filter(event => event.stageId === parent.id) }
      return dataSources.events.filter(event => event.stageId === parent.id && isWithinTimeWindow(start, end, event.startsAt, event.endsAt));
    }
  },

  Event: {
    id: (parent) => parent.id,
    appId: (parent) => parent.appId,
    stageId: (parent) => parent.stageId,
    name: (parent) => parent.name,
    description: (parent) => parent.description,
    image: (parent) => parent.image,
    startsAt: (parent) => parent.startsAt,
    endsAt: (parent) => parent.endsAt,
    stage: (parent) => dataSources.stages.filter(stage => stage.id === parent.stageId)[0]
  }
};