import { render } from 'react-dom'
import React, { useState, useRef } from 'react'
import clamp from 'lodash-es/clamp'
import { useSpring, useSprings, useTrail, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './VisualTweets.css';

const VisualTweets = ()=> {
  const [on, toggle] = useState(false);
  const items = [
    'Tweet 1',
    'Tweet 2',
    'Tweet 3',
    'Tweet 4',
  ]
  
  const trail = useTrail(items.length, {
    from: {color: '#000', opacity: 0},
    opacity: on ? 0 : 1,
    x: on ? 0: 20,
    height: on ? 80 : 0,
    config: {
      tension: 80,
      
    }
  });

  return (
    <div className="container">
      <button onClick={() => toggle(!on)}>Change</button>
      <div className="tweetContainer" >
        {trail.map(({x, height, ...rest}, index) =>(
          <animated.div 
            key ={items[index]}
            className="tweets" 
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}> 
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