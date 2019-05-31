import React, {Component} from 'react';
import Tweet from './Tweet.js';
class TwitGrid extends Component{
    constructor(){
        super();
        this.state = {
            tweets: []
        }
    }

    render(){
        return(
            <div>
                <Tweet/>
            </div>
            
        )};
        
}

export default TwitGrid;