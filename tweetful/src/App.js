import React from 'react';
import './App.css';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';

function App() {
  return (
    <div className="Body">
      <Header/>
        <div className="App">
          <div className="leftBar">
            Left Bar
          </div>

          <div className="content">
          <h1>TweetFul</h1>
            <p> Ready to view your tweets in a new way? </p>
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
