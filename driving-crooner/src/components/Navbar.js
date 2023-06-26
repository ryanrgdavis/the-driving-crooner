import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import logo from '../images/logo.PNG';

function Navbar() {
    return (
        <nav>
            <img src={logo} alt="Logo" className="logo" />
            <div className="links">
                <Link to="/">Home</Link>
                <Link to="/jobapplication">Job Application</Link>
                <Link to="/shop">Shop</Link>
                <Link to="/cart">Cart</Link>
            </div>
        </nav>
    );
}

export default Navbar;