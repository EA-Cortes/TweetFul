import React from 'react';
import './style/App.css';
import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import SearchForm from './components/SearchForm';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import TwitterAPI from './TwitterAPI';
import Tweet from './components/tweets/Tweet';
// import VisualTweets from './components/tweets/VisualTweets.js';

const App = () =>{    
  return (    
    <div>
    <div className="Body">
    
      
      <Header/>
        <div className="App">
        <Router>
          <div className="leftBar">
            
          <h1>SerTweet</h1>
            <p> A fresh client for searching/viewing tweets </p>aaaaaa
           <nav>
            <ul className="listStyle">
            <Link to="/">
              <li>
                Account
              </li>
              </Link>
              <Link to="/search"><li>
                Search
              </li></Link>
              <Link to="/viewTweets">
              <li>
                Display
              </li>
              </Link>
              
            </ul>
            </nav>
            </div>
            
            <div className="content">
            <Switch>                              
              <Route path="/search" component={SearchForm} />
              <Route path="viewTweets" component={PH} />
              <Route exact path="/" component={""} />                        
            </Switch>
           </div>
            
         
            
          

          </Router>

         
        </div>
         
        <Footer/>    
    </div>
    
    </div>
  );
  
}

export default App;

function PH(){
  return <Tweet/>;
}