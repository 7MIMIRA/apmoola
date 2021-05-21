const mongoose = require('mongoose');
const { Schema } = mongoose;

const appSchema = new Schema({ name: String });
const stageSchema = new Schema({ name: String });
const eventSchema = new Schema({
  appId: String,
  stageId: String,
  name: String,
  description: String,
  image: String,
  startsAt: Number,
  endsAt: Number
});

const App = mongoose.model('App', appSchema);
const Stage = mongoose.model('Stage', stageSchema);
const Event = mongoose.model('Event', eventSchema);

module.exports = {
  App,
  Stage,
  Event
};

