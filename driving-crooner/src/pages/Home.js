import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import jobPosterImage from '../images/jobposter.PNG'

function Home() {
    return (
        <div className="home-container">
            <h1>The Driving Crooner</h1>
            <div className="home-about-section">
                <h2>About</h2>
                <p>
                    When I was a kid, I fell into a river and a fish bumped me out of the water, I was supposed to die, and a fish bumped me out with it's nose, that was the earth telling me, I'm supposed to do something great, and I know that's the driving crooner, it has to be, you know what I mean James?
                </p>
                <p>
                    We offer a range of products and services to enhance your driving experience. Visit our shop to browse and
                    purchase our fine selection of decals. DON'T STEAL MY DECALS! Don't forget to check out our job opportunities and apply
                    today! BACK OFF FRAT BOYS, GET YOUR OWN DECALS!
                </p>
            </div>
            <img src={jobPosterImage} alt="Job Poster" className="job-poster-image" />
        </div>
    );
}

export default Home;