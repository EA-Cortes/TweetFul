// Server reqs
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoSanitize =  require('express-mongo-sanitize');
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
/*
app.use(mongoSanitize({
  replaceWith: '_'
}));
*/
//Init database
var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/mydb";
var url = "mongodb+srv://" + API_Keys.mongoUsername + ":" + API_Keys.mongoPW + "@tweetstorage-63af0.mongodb.net/test?retryWrites=true&w=majority";

// Connect database to server
MongoClient.connect(url, {
  useUnifiedTopology: true,
},
  (err, db) => {
    if (err) throw err
    else console.log("Connected to DB!");
    // db.getCollectionInfos();
    // );
    /*
    db.createCollection('test_drop', 
        (err, collection) => {
          console.log("collection created");
      }
    );
    */
    /*
    var dbo = db.db("tweets");  
    dbo.collections(
      (err, collections)=>{
        collections.forEach(
          (element, index)=>{
            console.log(element.s.namespace);
          });
        // console.log(collections);
      }
      
    );
    
      insertDocuments(db, () =>{
        findDocuments(db, () =>{
          
        });
      });
*/
    db.close();
    console.log("Closing DB connection");

    // Show all tweets
    /*
    dbo.collection("data").find({}).toArray(
      (err, result) => {
        if(err) throw err;
        console.log(result);
        
        
      });
*/ 
    // EoF
    
    
    
    });

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
          currentUser.screen_name = profie._json.screen_name;
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

// Init Tweet array  
var tweets = [];
var searchPam = { q: 'mango since:2011-07-11', count: 20 }

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
      // console.log(element);
    // Add tweet to array
      // console.log(element.entities.media);
      if(element.entities.media != null){
        tweet.mediaLink = element.entities.media[0].media_url_https;
      }
      tweets.push(tweet);
    }      
  )

});

app.post('/sendFormData', function(req, res){
  // Pulling search keyword from user
  var searchFor = "'" + req.body.keyword + " since:2011-07-01'";
  const searchQ = req.body.keyword;
    var orQ = searchQ;
    var conQ = searchQ.toLowerCase();
  // Connecting to the search/tweets route
  searchPam.q = searchFor;
  console.log(searchPam);
  var timeElapsed = 0;
  // ********************************************** // 
  console.log("Refreshing tweets. Time elapsed: " + timeElapsed + "\ts");
  tweets = [];
  T.get('search/tweets', searchPam, 
    (err, data) => {
      // To get tweet metadata
      // console.log(data.st)
      data.statuses.forEach(
        (element, index)=>{
        // Temp save each tweet  
        var tweet = {
          name: element.user.name,
          screen_name: element.user.screen_name,
          tweet: element.text,
          key: element.id_str,
          ts: new Date(element.created_at),
          profilePicLink: element.user.profile_image_url_https,
          flagRT: false,
          textStyle: {color: "black"}
          
        }
        // Filter RT's
        if(element.retweeted_status != null){
          tweet.flagRT = true;
          tweet.profilePicLink = element.retweeted_status.user.profile_image_url_https;
          tweet.name = element.retweeted_status.user.name;
          tweet.screen_name = element.retweeted_status.user.screen_name;
          tweet.tweet = element.retweeted_status.text;
          tweet.textStyle = {color: "black"};
        }

        if(element.entities.media != null){
          tweet.mediaLink = element.entities.media[0].media_url_https;
        }
          // Add tweet to array
          console.log(element);
          
          tweets.push(tweet);
          }      
       )
    // ----------------------- Send tweets to DB -----------------------  
    MongoClient.connect(url, {
      useUnifiedTopology: true,
      },
      (err, db) => {
        if (err) throw err
        else console.log("Sending tweets to DB!");
        var dbo = db.db("tweets");
        
        dbo.collection(conQ).insertOne({
          lowQ: conQ,
          sQ: orQ
        });
        
        dbo.collection(conQ).insertMany(tweets, 
          
          (err, result) => {
            if(err) throw err;
            // console.log("error in first pass");
            db.close();
          });
    
        // EoF
        });
        
    });
    // -----------------------      EoF         -----------------------  

  
  var thread = setInterval(() => {
    timeElapsed = timeElapsed + 15;
    // console.log("\nSearching for: " + JSON.stringify(searchPam));
    console.log("Refreshing tweets. Time elapsed: " + timeElapsed + "\ts");
    if(timeElapsed > 10800){
      console.log("3 hours deep, pausing search");
        clearInterval(thread);
    }else{
      tweets = [];
  T.get('search/tweets', searchPam, 
  (err, data) => {
    // To get tweet metadata
    // console.log(data.st)
    data.statuses.forEach(
      (element, index)=>{
      // Temp save each tweet  
      var tweet = {
        name: element.user.name,
        screen_name: element.user.screen_name,
        tweet: element.text,
        key: element.id_str,
        ts: new Date(element.created_at),
        profilePicLink: element.user.profile_image_url_https,
        flagRT: false,
        textStyle: {color: "black"}

      }
      // Filter RT's
      if(element.retweeted_status != null){
        tweet.flagRT = true;
        tweet.profilePicLink = element.retweeted_status.user.profile_image_url_https;
        tweet.name = element.retweeted_status.user.name;
        tweet.screen_name = element.retweeted_status.user.screen_name;
        tweet.tweet = element.retweeted_status.text;
        tweet.textStyle = {color: "black"};
      }

      if(element.entities.media != null){
        tweet.mediaLink = element.entities.media[0].media_url_https;
      }
        // Add tweet to array
        console.log(element);
        
        tweets.push(tweet);
          }      
       )
      //  console.log(tweets.length);

       if(tweets === undefined || tweets.length < 1 ){
        console.log("array empty, skipping pass");
      }else{  
        MongoClient.connect(url, {
          useUnifiedTopology: true,
          },
          (err, db) => {
            if (err) throw err
            else console.log("Sending tweets to DB!");
            var dbo = db.db("tweets");
  
            // Show all tweets
            dbo.collection(conQ).insertMany(tweets, 
              
              (err, result) => {
                if(err) throw err;
                // console.log("error in repetition");
                db.close();
              });
            });
        }
        

    });
    
    //  console.log(tweets.length);
        // EoF
        


    }      
  }, 20000);
  
// ********************************************** // 
  // end of response
  res.end();
});



// Middleware that returns tweets array
app.get('/api/tweets', 
  (req, res) => {
  res.json(tweets);
});

const PORT = 5000; // process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ' + PORT));

module.exports = app;