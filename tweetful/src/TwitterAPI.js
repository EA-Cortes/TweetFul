import React, {useState} from 'react';
// import { createSecureContext } from 'tls';


// const SearchForm = ()=> {
const TwitterAPI = (props)=> {
    const [loggedIn] = useState(false);
    // const [loggedIn, setLoggedIn] = useState(false);
    // useEffect Hook replaces component did mount\
    /*
    useEffect(() => {
      if(!loggedIn){
        fetch('/loggedUser')
          .then(res => res.text())
          .then(currentUser => {     
            currentUser = JSON.parse(currentUser)
            // Output logged in user to screen
            if(currentUser.name !== ""){
              setLoggedIn(true);
              document.getElementById('userName').innerHTML = currentUser.name;
              document.getElementById('twitterAt').innerHTML = "@" + currentUser.screen_name;
            } 
          });  
        } 
     });
     */
    return(
        
        loggedIn?
        <div className="container">
            <div>Logged in as:  
                <div id="userName"></div> 
                <div id="twitterAt"></div>
            </div>
        </div> 
        :
        <div className="container" >
            <h2>Login</h2>
            <a style={loginButton} href="http://localhost:5000/auth/twitter">Sign in with Twitter </a>
            {/* <a style={loginButton} href="/createAccount"> Create Twitter account</a> */}
        </div>   
    )
  // End of TwitterAPI
}

const loginButton = {
    color: "white",
    // border: "2px solid black",
    padding: "10px"
}
export default TwitterAPI;