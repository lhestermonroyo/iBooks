const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const Users = require('../../model/userModel');

passport.serializeUser((user, done) => {
  console.log('Serialized user:', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Users.findById(id, (err, user) => {
    console.log('Deserialized user:', user);
    done(err, user);
  })
});

passport.use(LocalStrategy);
module.exports = passport;