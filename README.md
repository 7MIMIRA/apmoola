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
 ## Other methods can be found [here](https://www.apollographql.com/blog/4-simple-ways-to-call-a-graphql-api-a6807bcdb355/)

<br>
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

  app(name: String!): App!
  stage(name: String!): Stage!
  event(name: String!): Event!
}
```

<br>

# Supports
- Listing
  - apps
  - stages
  - events
  - events in an app
  - stages in an app
  - events at a stage
  - stage for an event
  - events that occur between two dates

- Querying a single
  - app
  - stage
  - event

- Searching by name
  - apps
  - stages
  - events

<br>

# TODO
- Mutations to allow adding, updating, and removing events and stages
