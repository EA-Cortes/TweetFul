import React from 'react';
import {Router, Link} from 'react-dom';
import './styles/Header.css';

const Header = () =>{
    return(
        <div className="NavBar">
            <div>Home</div>
            <div>Services</div>
            <div>Pricing</div>
            <div>About Us</div>
            <div>Contact</div>
        </div>
    )
}

export default Header;
