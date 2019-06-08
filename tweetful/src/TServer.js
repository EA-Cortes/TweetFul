const express = require('express');
const bodyParser = require('body-parser');
const API_Keys = require('./API_Keys');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const session = require('express-session');
const app = express();

const currentUser = {name : "", screen_name: ""};

app.use(passport.initialize());
// app.use(passport.session());

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: API_Keys.consumerSecret,
    // cookie: {secure : true}
}));
// app.use(passport.session());

passport.use(new Strategy({
    consumerKey: API_Keys.consumerKey,
    consumerSecret: API_Keys.consumerSecret,
    callbackURL: "http://localhost:5000/auth/twitter/callback",
    includeEmail: true
  },
   (token, tokenSecret, profile, cb) => {
        // console.log(profile);
        
        currentUser.name = profile._json.name;
        currentUser.screen_name = profile._json.screen_name;
        
        console.log("\Login attempt by:");
        console.log(profile._json.screen_name);
        return cb(null, profile);
  }
));

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

// Middleware
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter'), //{successRedirect: '/'}),//);
  (req, res) => {
    //   res.json(tweets);
    
      res.redirect('http://localhost:3000');
  });


app.get('/signInStatus', 
  // app.get('https://api.twitter.com/1.1/account/settings.json',
    (req, res) => {
      res.json("req");
    }
  // )        
);
  
  

app.get('/loggedUser', (req, res) => {
  if(currentUser.name != ''){
    console.log("logged in as: ");
  console.log(currentUser);
  }
  res.json(currentUser);
  
  
});

app.get('/api/customers', (req, res) => {
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Mary', lastName: 'Jane'},
        {id: 3, firstName: 'Steve', lastName: 'Smith'},
        {id: 4, firstName: 'Mark', lastName: 'Johns'}
    ];
    res.json(customers);
});

app.get('/api/tweets', (req, res) => {
    const tweets = [
        {
            id: 1,
            userName: "svperclvster",
            tweet: "They always say yeehaw but they never ask haw yee",
            date: "2019-03-22T18:25:43.511Z"
        },
        {
            id: 2,
            userName: "53npai",
            tweet: "Need some sad horny content",
            date: "2019-03-22T18:25:43.511Z"},
        {
            id: 3,
            userName: "50cent",
            tweet: "I can't believe my grand mothers making me take out the garbage. I'm rich fuck this. I'm going home!",
            date: "2010-09-26T14:56:43.511Z"
        }
    ];
res.json(tweets);
});

const PORT = 5000; // process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ' + PORT));

module.exports = app;