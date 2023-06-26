import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
    return (
        <div className="home-container">
            <nav className="navbar"></nav>
            <h1>The Driving Crooner</h1>
            <p>
                We offer a range of products and services to enhance your driving experience. Visit our shop to browse and
                purchase our fine selection of decals. DON'T STEAL MY DECALS! Don't forget to check out our job opportunities and apply
                today!
            </p>
        </div>
    );
}

export default Home;