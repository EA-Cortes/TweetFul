import React, {useState, useEffect} from 'react';
import '../style/App.css';
import LogIn from './LogIn.js';

const LandingPage = ()=> {

    return(
        <div>
            <div className="body">
                <div className="App">
                    <div className="leftBar">
                        <h1>SerTweet</h1>
                        <p> A fresh search of tweets </p>
                        <LogIn/>

                    </div>
                    <div className="content">
                        <h1>{"Ser Tweet landing page demo"}</h1>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default LandingPage;