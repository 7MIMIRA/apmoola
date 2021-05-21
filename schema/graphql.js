const { gql } = require('apollo-server');

module.exports = gql`
  type App {
    id: ID!
    name: String!
    """
    start and end parameters are optional if used, it will limit results to events that
    fall within the start and end dates (inclusive)

    Required Format: milliseconds since unix epoch
    """
    events(start: Int, end: Int): [Event!]!
    stages: [Stage!]!
  }

  type Stage {
    id: ID!
    name: String!
    """
    start and end parameters are optional if used, it will limit results to events that
    fall within the start and end dates (inclusive)

    Required Format: milliseconds since unix epoch
    """
    events(start: Int, end: Int): [Event!]!
  }

  type Event {
    id: ID!
    appId: ID!
    stageId: ID!
    name: String!
    description: String!
    image: String!
    startsAt: Int!
    endsAt: Int!
    stage: Stage!
  }

  type Query {
    apps: [App!]!
    stages: [Stage!]!
    """
    start and end parameters are optional if used, it will limit results to events that
    fall within the start and end dates (inclusive)

    Required Format: milliseconds since unix epoch
    """
    events(start: Int, end: Int): [Event!]!

    app(id: ID, name: String): App!
    stage(id: ID, name: String): Stage!
    event(id: ID, name: String): Event!
  }

  type Mutation {
    addStage(name: String!): Stage

    # id value will determine which stage is being updated
    updateStage(id: ID!, name: String): Stage

    removeStage(id: ID!): Stage

    addEvent(appId: ID!, stageId: ID!, name: String!, description: String!, image: String!, startsAt: Int!, endsAt: Int!): Event

    # id value will determine which event is being updated
    updateEvent(id: ID!, appId: ID, stageId: ID, name: String, description: String, image: String, startsAt: Int, endsAt: Int): Event

    removeEvent(id: ID!): Event
  }
`;