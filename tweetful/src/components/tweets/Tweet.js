import React, {Component, useState, useEffect} from 'react';
import './Tweet.css';
class Tweet extends Component{
    constructor(){
        super();
        this.state = {
            tweets: []
        }
    }

   
    componentDidMount(){
        setInterval(() => {
            // get('/search/tweets');
            
            fetch('/api/tweets')
            .then(res => res.json())
            .then(tweets => this.setState({tweets},
                ));    
        }, 1000);
    }

    render(){
        return(
            
            <div className="container" style={containerStyle}>
                <h2>Searched tweets</h2> 
                <ul style={style}>
                {this.state.tweets.map(tweet => 
            
                    <li key = {tweet.key}>
                        <div style = {tweetStyle} >
                            <div style={tweet.textStyle}>
                            
                                <div style ={posterStyle}>
                                    <img src={tweet.profilePicLink} style = {imgStyle}/>
                                    &nbsp; {tweet.name}: @{tweet.screen_name} <br/>
                                </div>
                                <div>
                                    {tweet.tweet } 
                                    <img src={tweet.mediaLink} style ={picStyle}/>
                                </div>
                            </div>
                            <div>
                                {tweet.ts}
                            </div>
                        </div>
                    
                    </li>
                )}
            </ul>
            </div>   
        )};
}

const style = {
    listStyle: "none"
}

const tweetStyle = {
    justifyContent: "center",
    background: "white",
    border: "1px solid #FFFFFF",
    borderRadius: "16px",
    color: "#555566",
    margin: "5px"
}

const posterStyle = {
    margin: "auto"
}

const picStyle = {
    maxWidth: "400px",
}

const imgStyle = {
    borderRadius: "16px"
}

const containerStyle = {
    background: "#0099ee",
    paddingBottom: "1px"
}

export default Tweet;