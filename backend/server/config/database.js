const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const uri = 'mongodb://localhost:27017/ibooks'

mongoose.connect(uri).then(() => {
    console.log('Connected to the database');
  },
  (err) => {
    console.log('Unable to connect to the database', err);
  }
)

module.exports = mongoose.connection;