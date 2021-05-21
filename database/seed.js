const { db } = require('./connection.js');
const { App, Stage, Event } = require('../schema/mongodb.js');

const DATA = {
  "apps": [
      {
          "name": "HipHopFest 2020"
      }
  ],
  "stages": [
      {
          "name": "Rizzle Stage"
      },
      {
          "name": "Tizzle Stage"
      },
      {
          "name": "Fo’shizzle Stage"
      }
  ],
  "events": [
      {
          "appId": "b810bf6d-d81d-4104-bc1a-3b21d5154076",
          "stageId": "a4087686-ee6c-49d8-a4f0-d67f5931df3a",
          "name": "Kanye West",
          "description": "Kanye Omari West is an American rapper, singer, songwriter, record producer, fashion designer, and entrepreneur.",
          "image": "http://assets.aloompa.com.s3.amazonaws.com/rappers/KanyeWest.jpeg",
          "startsAt": 1577916000,
          "endsAt": 1577919600
      },
      {
          "appId": "b810bf6d-d81d-4104-bc1a-3b21d5154076",
          "stageId": "a4087686-ee6c-49d8-a4f0-d67f5931df3a",
          "name": "Drake",
          "description": "Aubrey Drake Graham is a Canadian rapper, singer, songwriter, record producer, actor, and entrepreneur. Drake initially gained recognition as an actor on the teen drama television series Degrassi: The Next Generation in the early 2000s.",
          "image": "http://assets.aloompa.com.s3.amazonaws.com/rappers/Drake.jpeg",
          "startsAt": 1577919600,
          "endsAt": 1577923200
      },
      {
          "appId": "b810bf6d-d81d-4104-bc1a-3b21d5154076",
          "stageId": "89be560f-6905-471a-8096-102e29a84e77",
          "name": "Kendrick Lamar",
          "description": "Kendrick Lamar Duckworth is an American rapper and songwriter. Raised in Compton, California, Lamar embarked on his musical career as a teenager under the stage name K-Dot, releasing a mixtape that garnered local attention and led to his signing with indie record label Top Dawg Entertainment (TDE)",
          "image": "http://assets.aloompa.com.s3.amazonaws.com/rappers/Kendrick.jpeg",
          "startsAt": 1577916000,
          "endsAt": 1577919600
      },
      {
          "appId": "b810bf6d-d81d-4104-bc1a-3b21d5154076",
          "stageId": "89be560f-6905-471a-8096-102e29a84e77",
          "name": "Future",
          "description": "Nayvadius DeMun Wilburn, known professionally as Future, is an American rapper, singer, songwriter, and record producer.",
          "image": "http://assets.aloompa.com.s3.amazonaws.com/rappers/Future.jpeg",
          "startsAt": 1577919600,
          "endsAt": 1577923200
      },
      {
          "appId": "b810bf6d-d81d-4104-bc1a-3b21d5154076",
          "stageId": "a6bb97dc-224c-4f8f-9af7-fd8b5731840f",
          "name": "J. Cole",
          "description": "Jermaine Lamarr Cole, better known by his stage name J. Cole, is an American hip hop recording artist and record producer.",
          "image": "http://assets.aloompa.com.s3.amazonaws.com/rappers/JCole.jpeg",
          "startsAt": 1577923200,
          "endsAt": 1577930400
      }
  ]
};

clearAndSeed();

async function clearAndSeed() {
  await App.deleteMany({});
  await Stage.deleteMany({});
  await Event.deleteMany({});
  console.log('App, Stage, and Event Documents Deleted')
  try{
    await App.insertMany(DATA.apps);
    await Stage.insertMany(DATA.stages);
    await Event.insertMany(DATA.events);
    console.log('App, Stage, and Event Documents Seeded');
  } catch(err) {
    console.error(err);
  } finally {
    db.close();
  }
}
