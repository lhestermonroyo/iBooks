const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
mongoose.promise = Promise;

let usersSchema = new Schema(
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
  }
);

usersSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password);
  },
  hashPassword: (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10);
  }
}

usersSchema.pre('save', (next) => {
  if (!this.password) {
    console.log('No password provided.');
    next();
  }
  else {
    console.log('Password saved.');

    this.password = this.hashPassword(this.password);
    next();
  }
})

const Users = mongoose.model('users', usersSchema);

module.exports = Users;