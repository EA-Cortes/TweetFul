// Server reqs
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoSanitize =  require('express-mongo-sanitize');
const assert = require('assert');
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

// Password encryption

const saltRounds = 10;
const ptPassword = 'bluelazernzxt';
const optPassword = 'not_bacon';

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

/*
//  MongoClient Template 
MongoClient.connect(url, {useUnifiedTopology: true},
  (err, db) => {
    if (err) throw err
    // insert db query here


    db.close();
    }
  );
*/



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
displayTweets = [];
var tweets = [];
var defaultSearch = "quarantine";
var searchPam = { q: 'mango since:2011-07-11', count: 12 }

app.post('/register', 
  (req, res, next)=>{
    console.log(req.body.username);
    console.log(req.body.email);
    console.log(req.body.password);

    res.render('index', {title: 'Registration Complete'});
  }
);

// ****************************** Route that searches for tweets ******************************
T.get('search/tweets', searchPam, 
(err, data) => {
// To get tweet metadata
  console.log(data)
 /* 
  data.statuses.forEach(
    (element, index)=>{
    // Temp save each tweet  
      var tweet = {
        name: element.user.name,
        screen_name: element.user.screen_name,
        tweet: element.text,
        tweet_id: element.id_str
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
  */

});

// ***********************************  User made searches  ************************************ // 


app.post('/sendFormData', function(req, res){
  // Pulling search keyword from user
  var searchFor = "'" + req.body.keyword + " since:2011-07-01'";
  // defaultSearch = req.body.keyword;
  const searchQ = req.body.keyword;
    var orQ = searchQ;
    var conQ = searchQ.toLowerCase();
    defaultSearch = conQ;
  // Connecting to the search/tweets route
  searchPam.q = searchFor;
  console.log(searchPam);
  var timeElapsed = 0;
  // ********************************************** // 
  console.log("Refreshing tweets. Time elapsed: " + timeElapsed + "\ts");
  var toInsert = false;
  T.get('search/tweets', searchPam, 
    (err, data) => {
      // To get tweet metadata
      data.statuses.forEach(
        (element, index)=>{
          toInsert = false;
          // Temp save each tweet  
          var tweet = {
            name: element.user.name,
            screen_name: element.user.screen_name,
            tweet: element.text,
            tweet_id: element.id_str,
            ts: new Date(element.created_at),
            profilePicLink: element.user.profile_image_url_https,
            flagRT: false,
            
          }
          // Filter RT's
          if(element.retweeted_status != null){
            tweet.name = element.retweeted_status.user.name;
            tweet.screen_name = element.retweeted_status.user.screen_name;
            tweet.tweet = element.retweeted_status.text;
            tweet.tweet_id = element.retweeted_status.id_str;            
            tweet.ts = new Date(element.retweeted_status.created_at);
            tweet.profilePicLink = element.retweeted_status.user.profile_image_url_https;
            tweet.flagRT = true;
          }

          if(element.entities.media != null){
            tweet.mediaLink = element.entities.media[0].media_url_https;
          }
          // Add tweet to array
          // console.log(element);
          
          // Find if tweet already exists in DB
          MongoClient.connect(url, {useUnifiedTopology: true},           
            (err, db) => {
              if (err) throw err;
              var dbo = db.db("tweets");
              dbo.collection(conQ).findOne({"tweet_id": tweet.tweet_id},
                (err, doc) => {
                  if(err) throw err;
                  console.log(doc);
                  if(doc == null){
                    toInsert = true;
                    }
                  }
                );
              if(toInsert){
                dbo.collection(conQ).insertOne(tweet,
                  (err, result) =>{
                    if(err) throw err;
                    }
                  );    
                }  
              db.close();            
              }
            );           
          }      
        ) 
      }
    );
    
    // -----------------------      EoF         -----------------------  

  
  var thread = setInterval(() => {
    timeElapsed = timeElapsed + 15; 
    // console.log("\nSearching for: " + JSON.stringify(searchPam));
    console.log("Refreshing tweets. Time elapsed: " + timeElapsed + "\ts");
    if(timeElapsed > 120){
      console.log("3 hours deep, pausing search");
        clearInterval(thread);
    }else{
       
      T.get('search/tweets', searchPam, 
        (err, data) => {
          data.statuses.forEach(
            (element, index)=>{              
              toInsert = false;
              tweets = []; 
              var tweet = {
                name: element.user.name,
                screen_name: element.user.screen_name,
                tweet: element.text,
                tweet_id: element.id_str,
                ts: new Date(element.created_at),
                profilePicLink: element.user.profile_image_url_https,
                flagRT: false,      
                }

              // Filter RT's
              if(element.retweeted_status != null){                                          
                tweet.name = element.retweeted_status.user.name;
                tweet.screen_name = element.retweeted_status.user.screen_name;
                tweet.tweet = element.retweeted_status.text;
                tweet.tweet_id = element.retweeted_status.id_str;
                tweet.ts = new Date(element.retweeted_status.created_at);
                tweet.profilePicLink = element.retweeted_status.user.profile_image_url_https;                
                tweet.flagRT = true;
                }

              if(element.entities.media != null){
                tweet.mediaLink = element.entities.media[0].media_url_https;
                }        
              
              // check for duplicates
              MongoClient.connect(url, {useUnifiedTopology: true},
                (err, db) => {
                  if(err) throw err;
                  var dbo = db.db("tweets");
  
                  dbo.collection(conQ).findOne({"tweet_id": tweet.tweet_id},
                    (err, doc) => {
                        if(err) throw err;          
                                  
                          if(doc == null){                        
                            toInsert = true;   
                            console.log(doc);                                                                 
                          }           
                      }
                    );  
                  
                  if(toInsert){
                    dbo.collection(conQ).insertOne(tweet,
                      (err, result) =>{
                        if(err) throw err;
                        }
                      );    
                    }  
                    
                  db.close();                                 
                  // console.log(tweets);     
                  
                  
                  }
                );                            
              // console.log(tweets);
              }                  
            );     
            // console.log(tweets);
          }        
        );
      // console.log(tweets);
/*
      if(tweets === undefined || tweets.length < 1 ){
        console.log("[] skipping pass");        
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
                }
              );
            
            db.close(); 
            }
            
          );
        }
    */

  
    //  console.log(tweets.length);
        // EoF
        


    }      
  },15000);
  
// ********************************************** // 
  // end of response
  res.end();
});



// Middleware that returns tweets array
app.get('/api/tweets', 
  (req, res) => {
    
    MongoClient.connect(url, {useUnifiedTopology: true},
      (err, db) => {
        if(err) throw err;
        var dbo = db.db("tweets");
        dbo.collection(defaultSearch).find({}).toArray(
          (err, result) =>{
            if(err) throw err;
            res.json(result); 
            db.close();
          }
        );        
      }
    );

    // res.json(tweets);
  }
);

// Middleware that returns the databases
app.get('/getDBs',
  (req, res) =>{
    MongoClient.connect(url, {useUnifiedTopology: true},
      (err, db) => {
        if(err) throw err;
        // console.log("Connected to DB, trying to fetch DB names");
        // do stuff 
        var dbo = db.db("tweets");
        dbo.listCollections().toArray(
          (err, collections)=>{
            if(err) throw err;
            // console.log(collections);
            res.json(collections);
            }
          );
        db.close();
        // console.log("Fetched DBs. Closing now.")
        }
      );
  }
);

const PORT = 5000; // process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ' + PORT));

module.exports = app;