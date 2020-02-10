import { render } from 'react-dom'
import React, { useState, useEffect, useRef } from 'react'
import { useTrail, animated } from 'react-spring'
// import { useGesture } from 'react-use-gesture'
import './VisualTweets.css';
import './Tweet.js';
import axios from 'axios';

const VisualTweets = (props)=> {
  const [on, toggle] = useState(false);
  const [on2, setState] = useState(false);
  const [on3, setThree] = useState(false);
  // Function to get tweets from React Component
  const getTweets= (startingIndex)=>{
    let newTweets = [
      props.content[startingIndex],
      props.content[startingIndex+1],
      props.content[startingIndex+2],
      props.content[startingIndex+3], 
      ];
    return newTweets;
    }

  let items = getTweets(0);
  let items2 = getTweets(4);
  let items3 = getTweets(8);

  const trail = useTrail(items.length, {
    from: {color: '#000', opacity: 0},
    opacity: on ? 0 : 1,
    x: on ? 0: 20,
    height: on ? 80 : 0,
    config: {
      tension: 60,      
    }
    });

  const trail2 = useTrail(items2.length, {
    from: {color: '#000', opacity: 0},
    opacity: on2 ? 0 : 1,
    x: on2 ? 0: 20,
    height: on2 ? 80 : 0,
    config: {
      tension: 60,      
    }
    });

    const trail3 = useTrail(items3.length, {
      from: {color: '#000', opacity: 0},
      opacity: on3 ? 0 : 1,
      x: on3 ? 0: 20,
      height: on3 ? 80 : 0,
      config: {
        tension: 60,      
      }
      });

  return (
    <div className="container">
      <div className="buttonContainer"> 
        <button className="button" onClick={e => toggle((!on))}>Get new tweets</button> 
        <button className="button" onClick={e => setState(!on2)}>Get new tweets</button> 
        <button className="button" onClick={e => setThree(!on3)}>Get new tweets</button>
      </div>
      
      <div className="tweetContainer" >
        {trail.map(({x, height, ...rest}, index) =>(
          <animated.div 
            key ={items[index]}
            className="tweets" 
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}> 
              {/* Actual tweet objects will go below here :) */}
              
              <div>
                <img src={items[index].profilePicLink} />
                &nbsp; {items[index].name}: @{items[index].screen_name} <br />
                {items[index].tweet} 
                <img className="tweetPics" src={items[index].mediaLink}/>
                {items[index].ts}
              </div>
              
              



            </animated.div>
        ))}
        
      </div>

      <div className="tweetContainer" >
        {trail2.map(({x, height, ...rest}, index) =>(
          <animated.div 
            key ={items2[index]}
            className="tweets" 
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}> 
              {/* Actual tweet objects will go below here :) */}
              
              <div>
                <img src={items2[index].profilePicLink} />
                &nbsp; {items2[index].name}: @{items2[index].screen_name} <br />
                {items2[index].tweet} 
                <img className="tweetPics" src={items2[index].mediaLink}/>
                {items2[index].ts}
              </div>
              
              


            </animated.div>
        ))}
        
      </div>

      <div className="tweetContainer" >
        {trail3.map(({x, height, ...rest}, index) =>(
          <animated.div 
            key ={items3[index]}
            className="tweets" 
            style={{ ...rest, transform: x.interpolate(x => `translate3d(0,${x}px,0)`) }}> 
              {/* Actual tweet objects will go below here :) */}
              
              <div>
                <img src={items3[index].profilePicLink} />
                &nbsp; {items3[index].name}: @{items3[index].screen_name} <br />
                {items3[index].tweet} 
                <img className="tweetPics" src={items3[index].mediaLink}/>
              {items3[index].ts} 
              </div>
              
              


            </animated.div>
        ))}
        
      </div>
    
      

      
    </div>
   
  )
}



const tweetStyle = {
  
}


export default VisualTweets;