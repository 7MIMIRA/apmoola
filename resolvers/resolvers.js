const dataSources = require('../data.js');

module.exports = {
  Query: {
    apps: (parent, args) => dataSources.apps,
    stages: (parent, args) => dataSources.stages,
    events: (parent, args) => dataSources.events,
    app: (parent, args) => dataSources.apps.filter(app => app.name === args.name)[0],
    stage: (parent, args) => dataSources.stages.filter(stage => stage.name === args.name)[0],
    event: (parent, args) => dataSources.events.filter(event => event.name === args.name)[0]
  },

  App: {
    id: (parent, args) => parent.id,
    name: (parent, args) => parent.name,
    events: (parent) => dataSources.events.filter(event => event.appId === parent.id),
    stages: (parent) => {
      let stageIDs = {};
      for (let event of dataSources.events) {
        stageIDs[event.stageId] = true;
      }
      return dataSources.stages.filter(stage => stageIDs[stage.id])
    }
  },

  Stage: {
    id: (parent, args) => parent.id,
    name: (parent, args) => parent.name,
    events: (parent) => dataSources.events.filter(event => event.stageId === parent.id)
  },

  Event: {
    id: (parent, args) => parent.id,
    appId: (parent, args) => parent.appId,
    stageId: (parent, args) => parent.stageId,
    name: (parent, args) => parent.name,
    description: (parent, args) => parent.description,
    image: (parent, args) => parent.image,
    startsAt: (parent, args) => parent.startsAt,
    endsAt: (parent, args) => parent.endsAt,
    stage: (parent) => dataSources.stages.filter(stage => stage.id === parent.stageId)[0]
  }
};