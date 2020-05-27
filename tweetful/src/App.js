import React, { useState, useEffect } from 'react';
import './style/App.css';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import SearchPage from './components/SearchPage'
import DataAnalytics from './components/DataAnalytics'
import Account from './components/Account'
import Tweet from './components/tweets/Tweet';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import TwitterAPI from './TwitterAPI';
import { useSprings } from 'react-spring';

// import VisualTweets from './components/tweets/VisualTweets.js';

const App = () =>{    
  
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    // setLoggedIn(true);
  });
  return (    
    loggedIn?
    <div>
    <div className="Body">
        <div className="App">
        <Router>
          <div className="leftBar">
            
          <h1>SerTweet</h1>
            <p> A fresh client for searching/viewing tweets </p>
           <nav>
            <ul className="listStyle">
            <Link to="/">
              <li>Home</li>
            </Link>
            
            <Link to="/search">
              <li>Search</li>
            </Link>
            
            <Link to="/viewTweets">
              <li>Display Tweets</li>
            </Link>

            <Link to="/dataAnalytics">
              <li>Data analytics</li>
            </Link>

            <Link to="/account">
              <li>Account</li>
            </Link>
            

            <Link to="/signOut">
              <li>Sign Out</li>
            </Link>
              
            </ul>
            </nav>
            </div>
            
            <div className="content">
            <Switch>                              
              <Route path="/search" component={SearchPage} />
              <Route path="/viewTweets" component={Tweet} />
              <Route path="/dataAnalytics" component={DataAnalytics}/>
              <Route path="/account" component={Account}/>
              <Route exact path="/" component={""} />                        
            </Switch>
           </div>
            
         
            
          

          </Router>
          true
        </div>
         
        <Footer/>    
    </div>
    
    </div>
    :
    <div className="Body">
    <Header/>
      <h1>{"Not logged in"}</h1>
    </div>
  );
  
}

export default App;