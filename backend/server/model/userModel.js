const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Users = new Schema(
  {
    fullname: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    }
  }, 
  {
    collection: 'users'
  }
);

module.exports = mongoose.model('users', Users);