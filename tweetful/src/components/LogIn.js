import React, {useState, useEffect} from 'react';
import '../style/LogInForm.css';
import axios from 'axios';

const LogIn = ()=> {
    const [name, setName] = useState("");
    const [newUser, setNewUser] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    return(    
        newUser?    
        <div>
            <div>
                Create Account
                <form>
                    <div className="logInForm">
                            <input value={username}
                                onChange={e => setUsername(e.target.value)} 
                                placeholder="Username"
                                type="text">
                            </input>               
                    </div>

                    <div className="logInForm">
                            <input value={email}
                                onChange={e => setEmail(e.target.value)} 
                                placeholder="Email"
                                type="email">
                            </input>               
                    </div>

                    <div className="logInForm">
                        <input value={password}
                            onChange={e => setPassword(e.target.value)} 
                            placeholder="Password"
                            type="password">
                        </input>               
                    </div>

                    <div className="logInForm">
                        <input value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)} 
                            placeholder="Confirm Password"
                            type="password">
                        </input>               
                    </div>

                    <button type="submit"  onClick={e => CreateAccount()}>Create account</button>
                    <button type="submit"  onClick={e => toggleNewUser()}>Existing User</button>
                </form>


            </div>
        </div>
        :
        <div className="logInFormWrapper">
            Sign in Below:
                <form>
                <div className="logInForm">
                        <input value={username}
                            onChange={e => setUsername(e.target.value)} 
                            placeholder="Username"
                            type="text">
                        </input>                        
                </div>
                <div class="logInForm">                    
                    <input value={password}
                        onChange={e => setPassword(e.target.value)} 
                        placeholder="Password"
                        type="password">
                    </input>
                </div>

                <button type="submit" onClick={e=>logInUser()}>Log In</button>            
                <button onClick={e => toggleNewUser()}>New User</button>
                </form>

        </div>
    )
    
    function toggleNewUser(){
        setNewUser(!newUser);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        setEmail("");
    }

    function CreateAccount(){
        if(password === confirmPassword){
            register();
        }
    }

    function logInUser(){

    }


    function register(){
        axios.post(`/register`, {username, email, password, confirmPassword})
        .then(res => {
        //   console.log("response in server");
          
        //   console.log(res);
        //   console.log(res.data);
        })
    }
}

export default LogIn;