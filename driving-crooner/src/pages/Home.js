import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>The Driving Crooner</h1>
            <Link to="/shop">The Shop</Link>
            <Link to="/jobapplication">Job Application</Link>
        </div>
    );
}

export default Home;