const { db } = require('../database/connection.js');
const { App, Stage, Event } = require('../schema/mongodb.js');

module.exports = {
  Query: {
    apps: async () => App.find({}),
    stages: async () => Stage.find({}),
    events: async (parent, args) => {
      const { start, end } = args;
      if (!start && !end) { return Event.find({}) }
      const result = await Event.find({ startsAt: { $gte: start }, endsAt: { $lte: end }});
      return result;
    },
    app: async (parent, args) => {
      const { id, name } = args;
      const result = id ? await App.findById(id) : (await App.find({ name: name }))[0];
      return result;
    },
    stage: async (parent, args) => {
      const { id, name } = args;
      const result = id ? await Stage.findById(id) : (await Stage.find({ name: name }))[0];
      return result;
    },
    event: async (parent, args) => {
      const { id, name } = args;
      const result = id ? await Event.findById(id) : (await Event.find({ name: name }))[0];
      return result;
    }
  },

  Mutation: {
    addStage: async (parent, args) => {
      const stageExists = (await Stage.find(args))[0];
      if (!stageExists) { return Stage.create(args) }
    },
    updateStage: async (parent, args) => {
      let update = { ...args };
      delete update.id;
      return Stage.findOneAndUpdate({ _id: args.id }, update, { new: true });
    },
    removeStage: async (parent, args) => {
      return Stage.findOneAndRemove({ _id: args.id });
    },

    addEvent: async (parent, args) => {
      const eventExists = (await Event.find(args))[0];
      if (!eventExists) { return Event.create(args) }
    },
    updateEvent: async (parent, args) => {
      let update = { ...args };
      delete update.id;
      return Event.findOneAndUpdate({ _id: args.id }, update, { new: true });
    },
    removeEvent: async (parent, args) => {
      return Event.findOneAndRemove({ _id: args.id });
    }
  },

  App: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    events: async (parent, args) => {
      const { start, end } = args;
      if (!start && !end) { return Event.find({ appId: parent.id }) }
      return Event.find({ appId: parent.id, startsAt: { $gte: start }, endsAt: { $lte: end }});
    },
    stages: async (parent) => {
      let events = await Event.find({ appId: parent.id });
      let stageIDs = {};
      // crude method of getting all the stageIDs from events
      // TODO Refactor
      for (let i = 0; i < events.length; i++) {
        stageIDs[events[i].stageId] = true;
      }
      return Stage.find({ _id: Object.keys(stageIDs) });
    }
  },

  Stage: {
    id: (parent) => parent.id,
    name: (parent) => parent.name,
    events: async (parent, args) => {
      const { start, end } = args;
      if (!start && !end) { return Event.find({ stageId: parent.id }) }
      return Event.find({ stageId: parent.id, startsAt: { $gte: start }, endsAt: { $lte: end }});
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
    stage: async (parent) => {
      const result = await Stage.find({ _id: parent.stageId });
      return result[0];
    }
  }
};