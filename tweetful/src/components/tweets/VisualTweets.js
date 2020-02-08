import { render } from 'react-dom'
import React, { useState, useEffect, useRef } from 'react'
import { useTrail, animated } from 'react-spring'
// import { useGesture } from 'react-use-gesture'
import './VisualTweets.css';
import './Tweet.js';
import axios from 'axios';

const VisualTweets = (props)=> {
  const [on, toggle] = useState(false);

  // Function to get tweets from React Component
  const getTweets= ()=>{
    let newTweets = [
      props.content[0].tweet,
      props.content[1].tweet,
      props.content[2].tweet,
      props.content[3].tweet,
      ];
    return newTweets;
    }

  let items = getTweets();

  const trail = useTrail(items.length, {
    from: {color: '#000', opacity: 0},
    opacity: on ? 0 : 1,
    x: on ? 0: 20,
    height: on ? 80 : 0,
    config: {
      tension: 60,      
    }
    });

  return (
    <div className="container">
      <button onClick={e => toggle(!on)}>Get new tweets</button>
      <div className="tweetContainer" >
        {trail.map(({x, height, ...rest}, index) =>(
          <animated.div 
            key ={items[index]}
            className="tweets" 
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}> 
              {/* Actual tweet objects will go below here :) */}
              {items[index]} 
            </animated.div>
        ))}
      </div>
      

      
    </div>
   
  )
}



const tweetStyle = {
  
}


export default VisualTweets;