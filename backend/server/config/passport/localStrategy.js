const Users = require('../../model/userModel');
const LocalStrategy = require('passport-local').Strategy;
// const bcrypt = require('bcryptjs');

const strategy = new LocalStrategy({usernameField: 'username', passwordField: 'password'}, (username, password, done) => {
  Users.findOne({username: username}, (err, user) => {
    if (err) {
      return done(err);
    }

    if (!user) {
      return done(null, false, { error: 'Incorrect username entry.' });
    }

    if (!user.checkPassword(password)) {
      return done(null, false, { error: 'Incorrect password entry.' });
    }
    
    return done(null, user);
  })
});

module.exports = strategy;