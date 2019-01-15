const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('../model/userModel');
const passport = require('../config/passport');
const router = express();

router.get('/', (req, res) => {
  Users.find().sort({ _id: -1}).then((result) => {
    res.json(result);
  });
});

router.post('/login', (req, res, next) => {
  console.log(req.body);
  // const { username, password } = req.body;
  // console.log(req.body);
  // passport.authenticate("local", {
  //   successRedirect: '/',
  //   failureRedirect: 'api/users/login',
  //   failureFlash: true
  // })(req, res, next);
  },
  passport.authenticate('local'), (req, res) => {
    console.log(req.user);
    let userInfo = {
      username: req.user.username
    };
    // res.send(userInfo);
    res.json(userInfo);
  }
);

router.post('/add', (req, res) => {
  const {fullname, email, username, password} = req.body;
  if (fullname.length !== 0 && email.length !== 0 && username.length !== 0 && password.length !== 0) {
    Users.count({email: email}, (err, cnt) => {
      if (err) {
        console.log(err);
      }

      if (cnt == 0) {
        let newUser = new Users({
          fullname: fullname,
          email: email,
          username: username,
          password: password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
              console.log(err);
            }

            newUser.password = hash;
            newUser.save((err, savedUser) => {
              if (err) {
                console.log(err);
              } 
              else {
                res.json(savedUser);
              }
            });
          })
        })
      }
      else {
        res.json({error: 'E-mail already used in the system. Please try again.'});
      }
    })
  }
  else {
    res.json({error: 'Please fill in the fields.'});
  }
});

module.exports = router;