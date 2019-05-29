const express = require('express');
const bodyParser = require('body-parser');
const API_Keys = require('./API_Keys');
const path = require('path');
const passport = require('passport');
const Strategy = require('passport-twitter').Strategy;
const session = require('express-session');
const app = express();

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
        // User.findOrCreate({twitterId: profile.id}, (err, user) =>{
            // return cb(err, user);
        // });
        console.log(profile);
        return;
  }
));


// Middleware
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', 
    (req, res) =>{
        // res.send('Reached callback URL');
        console.log('yeet');
    }));




app.get('/api/customers', (req, res)=>{
    const customers = [
        {id: 1, firstName: 'John', lastName: 'Doe'},
        {id: 2, firstName: 'Mary', lastName: 'Jane'},
        {id: 3, firstName: 'Steve', lastName: 'Smith'},
        {id: 4, firstName: 'Mark', lastName: 'Johns'}
    ];
    res.json(customers);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('Server running on port: ' + PORT));

module.exports = app;