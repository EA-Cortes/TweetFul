// Server reqs
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
// require('dotenv').config();
// API Key holder
const API_Keys = require('./API_Keys');
const path = require('path');

// oAuth 2.0 
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;

// Twitter search API
// https://github.com/ttezel/twit
const Twit = require('twit');


// Init Server
const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded());

const T = new Twit({
  consumer_key: API_Keys.consumerKey,
  consumer_secret: API_Keys.consumerSecret,
  access_token: API_Keys.access_token,
  access_token_secret: API_Keys.access_token_secret
})

// Store username server side for display 😎
var currentUser = {name : "", screen_name: ""};

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
        // Store current user info in server
        if(currentUser.name === ""){
          currentUser.name = profile._json.name;
          currentUser.screen_name = profile._json.screen_name;
        }
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
      res.redirect('http://localhost:3000');
  });


// Middleware to get logged in user
var loggedIn = false;




app.get('/loggedUser', (req, res) => {
  if(currentUser.name !== ""){
    res.send(currentUser);
  }
});

app.post('/sendFormData', function(req, res){
  console.log(req.body);
  res.end();
});


// Init Tweet array  
var tweets = [];
var searchPam = { q: 'bassnectar since:2011-07-11', count: 12 }


// Route that searches for tweets
T.get('search/tweets', searchPam, 
(err, data) => {
// To get tweet metadata
// console.log(data.statuses)
  data.statuses.forEach(
    (element, index)=>{
    // Temp save each tweet  
      var tweet = {
        name: element.user.name,
        screen_name: element.user.screen_name,
        tweet: element.text,
        key: element.id_str
      }
    // Add tweet to array
      tweets.push(tweet);
    }      
  )
});

// Middleware that returns tweets array
app.get('/api/tweets', 
  (req, res) => {
  res.json(tweets);
});

const PORT = 5000; // process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ' + PORT));

module.exports = app;