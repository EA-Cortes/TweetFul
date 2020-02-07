import React, { Component } from 'react';
import './Tweet.css';

import { userTrail, animated } from 'react-spring';
import './VisualTweets.css';
import './VisualTweets.js'
import VisualTweets from './VisualTweets.js';



class Tweet extends Component {
    constructor() {
        super();
        this.state = {
            tweets: []
        }
    }

    componentWillMount() {
        // setInterval(() => {
        // get('/search/tweets');

        fetch('/api/tweets')
            .then(res => res.json())
            .then(tweets => this.setState({ tweets },
            ));
        // }, 1000);
    }
    render() {
        let content = [
            {
                tweet: "tweets[0].tweet",
                key: 1
            },
            {
                tweet: "tweet 20",
                key: 2
            },
            {
                tweet: "tweet 30",
                key: 3
            },
            {
                tweet: "tweet 40",
                key: 4
            },
        ];                
        // content[0].tweet = "new tweet";

        return (
            <div className="wrapper">
                <div>
                    <VisualTweets content={content} />
                </div>
                <div className="container" style={containerStyle}>
                    <h2>Searched tweets</h2>
                    <ul style={style}>
                        {this.state.tweets.map(tweet =>
                            <li key={tweet._id}>
                                <div style={tweetStyle} >
                                    <div style={tweet.textStyle}>

                                        <div style={posterStyle}>
                                            <img src={tweet.profilePicLink} style={imgStyle} />
                                            &nbsp; {tweet.name}: @{tweet.screen_name} <br />
                                        </div>
                                        <div>
                                            {tweet.tweet}
                                            <img src={tweet.mediaLink} style={picStyle} />
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
            </div>
        )
    };
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