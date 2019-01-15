const passport = require('passport');
const LocalStrategy = require('./localStrategy');
const Users = require('../../model/userModel');

passport.serializeUser((user, done) => {
  console.log('Serialized user:', user);
  done(null, {_id: user._id});
});

passport.deserializeUser((id, done) => {
  Users.findOne({_id: id}, 'username', (err, user) => {
    console.log('Deserialized user:', user);
    done(null, user);
  })
});

passport.use(LocalStrategy);
module.exports = passport;