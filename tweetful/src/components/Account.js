import React, {useState, useEffect} from 'react';
import '../style/Account.css';

const Account = ()=> {
    const [paid, setPaid] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    
    useEffect(()=>{
        setUsername("Carl");
        setEmail("testEmail@gmail.com");
    });

    return(        
        <div>
            <h1>Account page</h1>
            <div className="accountWrapper">
                

                <div className="accountLeft">
                    
                    <ul>Name: {username}</ul>
                    <ul>Email: {email}</ul>
                    <ul>Payment Info: </ul>

                </div>

                <div className="accountLeft">
                    haha
                </div>
            </div>
        </div>
    )

    
}



export default Account;