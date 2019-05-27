import React from 'react';
import './App.css';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import SearchForm from './components/SearchForm.js';
import API_Keys from './API_Keys.js';
import * as passport from 'passport';
import {Strategy, User} from 'passport-twitter';

function App() {
  
    window.alert('yeeeet');
  return (
    <div className="Body">
      <Header/>
        <div className="App">
          <div className="leftBar">
          <h1>SerTweet</h1>
            <p> Ready to view your tweets in a new way? </p>
            <h2>Goals</h2>
            <ul className="listStyle">
              <li>User Friendly application</li>
              <li>Let you search tweets by hashtag/username</li>
              <li>Display tweets in a user friendly way</li>
              <li>Provide examples/tutorials</li>
            </ul>
            <h2>Example</h2>
            <SearchForm/>
          </div>

          <div className="content">
            <p>Yesrrrrr</p>
          </div>

          <div className="rightBar">
            Right Bar  
          </div>  
        </div>
        <Footer/>
    </div>
  );
}

export default App;
