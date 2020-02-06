import { render } from 'react-dom'
import React, { useState, useRef } from 'react'
import clamp from 'lodash-es/clamp'
import { useSpring, useSprings, animated } from 'react-spring'
import { useGesture } from 'react-use-gesture'
import './VisualTweets.css';





const VisualTweets = ()=> {
  const pages = [
    'https://images.pexels.com/photos/62689/pexels-photo-62689.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/296878/pexels-photo-296878.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/1509428/pexels-photo-1509428.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/351265/pexels-photo-351265.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
    'https://images.pexels.com/photos/924675/pexels-photo-924675.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
  ]
  
  // console.log(pages.length);
  const [springs, set, stop] = useSprings(pages.length, index => ({opacity: 1}));
  const [on, toggle] = useState(false);
  set(index => ({opacity: 0}));

  const fade = useSpring({
    from: {
      opacity: 0
      },
    to: {
      opacity:1,
      }                
    });
      
  const { xy, c, o } = useSpring({
    config:{
      mass: 5,
      friction: 30,
      clamp: true
    },    
    xy: on ? [400, 0] : [-400, 0],
    c: on ? 'white' : 'red',
    o: on ? 1 : 1   
  });

  const anime = {
    fontSize: "30px",
    transform: xy.interpolate((x, y) => `translate(${x}px, ${y}px)`), 
    color: c.interpolate(c => c),
    opacity: o.interpolate(o => o)
    }

  return (
<div>aa</div>
    // springs.map(springs => <animated.div style={springs} />)
    /*<div>
      <animated.div style={anime}>
        {!on ? "I'm here" : "Now I'm over here"}
      </animated.div>
      <button onClick={() => toggle(!on)}>Change</button>
    </div>
    */
  )
}

const tweetStyle = {
  
}


export default VisualTweets;