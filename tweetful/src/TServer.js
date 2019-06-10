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

const T = new Twit({
  consumer_key: API_Keys.consumerKey,
  consumer_secret: API_Keys.consumerSecret,
  access_token: API_Keys.access_token,
  access_token_secret: API_Keys.access_token_secret
})

// Store username server side for display 😎
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
        // Store current user info in server
        currentUser.name = profile._json.name;
        currentUser.screen_name = profile._json.screen_name;
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
app.get('/loggedUser', (req, res) => {
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

app.get('/searchTweets', 
(res, req) =>{
  req.originalUrl = 'https://api.twitter.com/1.1/search/tweets.json?q=twitterdev%20new%20premium';
  // console.log(res);
  // res.json();
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

T.get('search/tweets', { q: 'wine since:2011-07-11', count: 10 }, 
(err, data) => {
// To get tweet metadata
// console.log(data.statuses)
    
  // Init Tweet array
  const tweets = [];

  data.statuses.forEach(
    (element, index)=>{
      // Temp save each tweet  
      const tweet = {
        name: element.user.name,
        screen_name: element.user.screen_name,
        tweet: element.text,
        id_str: element.id_str
      }

      // Add tweet to array
      tweets.push(tweet);
    }      
  )

// output tweets as JSON array
  console.log(tweets);
  console.log(tweets.length);

  // Convert tweet array to JSON array
  const ret = JSON.stringify(tweets);
  
  // Return tweet JSON object
  (req, res) => {
    res.json(ret)
  }
  

// console.log(ret);
      // res.json(tweets);
  },

)

const PORT = 5000; // process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ' + PORT));

module.exports = app;