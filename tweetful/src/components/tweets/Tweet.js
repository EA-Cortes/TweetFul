import React, {Component, useState, useEffect} from 'react';
class Tweet extends Component{
    constructor(){
        super();
        this.state = {
            tweets: []
        }
    }

   
    componentDidMount(){
        // setInterval(() => {
            // get('/search/tweets');
            
            fetch('/api/tweets')
            .then(res => res.json())
            .then(tweets => this.setState({tweets},
                ));    
        // }, 1000);
        
    }
    render(){
        return(
            <div className="container">
                <h2>Searched tweets</h2> 
                <ul style={style}>
                {this.state.tweets.map(tweet => 
                    <li key = {tweet.key}>
                        <div style = {tweetStyle}>
                            <div>
                                {tweet.name}: @{tweet.screen_name} <br/>
                                {tweet.tweet}
                            </div>
                            <div>
                                {tweet.date}
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

export default Tweet;