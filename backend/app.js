const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./server/config/passport');
const dbConnection = require("./server/config/database");

const app = express();
const port = 4000;

app
  .use(cors())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json());
  
app.use(session({
    secret: 'fraggle-rock',
    store: new MongoStore({mongooseConnection: dbConnection}),
    resave: false, 
    saveUninitialized: false
  })
);

app
  .use(passport.initialize())
  .use(passport.session());

app.use('/api/users', require('./server/routes/userRoute'));

app.listen(port, err => {
  if (err) {
    console.log(err);
  }

  console.log(`Server is now open at port ${port}`);
});
