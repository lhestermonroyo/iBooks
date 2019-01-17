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

// router.get('/session' (req, res) => {
  
// })

router.post('/login', (req, res, next) => {
    console.log("Requested from the client:", req.body);
    next();
  },
  passport.authenticate('local'), (req, res) => {
    console.log("Requested user:", req.user);
    let userInfo = {
      username: req.user.username,
      password: req.user.password
    };
    // if(userInfo) {
      res.send(userInfo);
    // }
    // else {
    //   res.json({error: "Incorrect username or password entry. Please try again"});
    // }
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
        newUser.save((err, savedUser) => {
          if (err) {
            console.log(err);
          } 
          else {
            res.json(savedUser);
          }
        });
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