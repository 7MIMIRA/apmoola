const mongoose = require('mongoose');
mongoose.connect('mongodb://3.142.212.44/aloompa', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

module.exports = {
  db
};