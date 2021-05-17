const { gql } = require('apollo-server');

module.exports = gql`
  type App {
    id: ID
    name: String
    events: [Event]
    stages: [Stage]
  }

  type Stage {
    id: ID
    name: String
    events: [Event]
  }

  type Event {
    id: ID
    appId: ID
    stageId: ID
    name: String
    description: String
    image: String
    startsAt: Int
    endsAt: Int
    stage: Stage
  }

  type Query {
    apps: [App]
    stages: [Stage]
    events: [Event]

    app(name: String): App
    stage(name: String): Stage
    event(name: String): Event
  }
`;