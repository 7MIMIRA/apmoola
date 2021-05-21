# apmoola
### A rockin GraphQL API
![](https://i.imgur.com/5AGFsVP.png)
<br>

# Setup
1. Fork and clone the repo
2. Navigate to the locally cloned repo directory and install dependencies
```
npm install
```
3. Run the server locally via start script
```
npm start
```
4. visit http://localhost:4000/ to open GraphQL Playground and run queries on your locally hosted GraphQL API

   -- or --

    Call the API using your favorite tool
 ## Curl Example
 ```
 curl \
-X POST \
-H "Content-Type: application/json" \
--data '{"query": "{ apps { name events { name }}}"}' \
http://localhost:4000/
 ```
 ### Other methods can be found [here](https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355/)

<br>

# Schema
```
# start and end arguments for events are not required
# if passed in, events will be filtered to include only those
# that fall within the start and end dates (inclusive)
# Format of start and end values needs to be in milliseconds since Unix Epoch

type App {
  id: ID!
  name: String!
  events(start: Int, end: Int): [Event!]!
  stages: [Stage!]!
}

type Stage {
  id: ID!
  name: String!
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
```

<br>

# Supports
- Listing
  - Apps
  - Stages
  - Events
  - Events in an app
  - Stages in an app
  - Events at a stage
  - Stage for an event
  - Events that occur between two dates

- Querying a single
  - App
  - Stage
  - Event

- Searching by name
  - Apps
  - Stages
  - Events

- Adding, updating, and removing
  - Stages
  - Events

