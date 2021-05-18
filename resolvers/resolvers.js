const { isWithinTimeWindow } = require('../utils/index.js');
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