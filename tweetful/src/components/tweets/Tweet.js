import React, {Component} from 'react';
class Tweet extends Component{
    constructor(){
        super();
        this.state = {
            tweets: []
        }
    }
    componentDidMount(){
        fetch('/api/tweets')
            .then(res => res.json())
            .then(tweets => this.setState({tweets},
                () => console.log('Tweets fetched..', tweets)));
    }
    render(){
        return(
            <div className="container">
                <h2>Searched tweets</h2> 
                <ul style={style}>
                {this.state.tweets.map(tweet => 
                    <li key = {tweet.id}>
                        <div style = {tweetStyle}>
                            <div>
                                @{tweet.userName}: {tweet.tweet}
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
    border: "1px solid #FFFFFF"
}

export default Tweet;