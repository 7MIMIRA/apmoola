const { db } = require('./connection.js');

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('MongoDB Status: OK');
  db.close();
});