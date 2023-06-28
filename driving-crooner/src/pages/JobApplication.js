import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/JobApplication.css'

function JobApplication() {
    const [submitted, setSubmitted] = useState(false);
    const [applyAgain, setApplyAgain] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    const handleApplyAgain = () => {
        setApplyAgain(true);
    };

    const handleReset = () => {
        setSubmitted(false);
        setApplyAgain(true);
    };

    if (submitted && !applyAgain) {
        return (
            <div className="centre">
                <h1>REJECTED</h1>
                <p>GET OUT OF HERE! BUT ALSO THEN AGAIN WE DO NEED PEOPLE TO WORK FOR US. YOU SHOULD APPLY AGAIN, please!</p>
                <button onClick={handleApplyAgain}>Apply Again</button>
            </div>
        );
    }

    if (!submitted && applyAgain) {
        return (
            <div className="job-application">
                <p>Your job application has been submitted as a volunteer role. Thank you!</p>
            </div>
        )
    }

    if (submitted && applyAgain) {
        return (
            <div className="job-application">
                <h1>The Driving Crooner</h1>
                <h2>Job Application</h2>
                <form onSubmit={handleReset}>
                    <h2>Driver Job Application</h2>
                    <input type="text" id="name" required />

                    <input type="email" id="email" required />

                    <input type="tel" id="phone" required />

                    <button type="submit">Submit</button>
                </form>
            </div>
        )
    }

    return (
        <div className="job-application">
            <h1>The Driving Crooner</h1>
            <h2>Job Application</h2>
            <form onSubmit={handleSubmit}>
                <h2>Driver Job Application</h2>
                <input type="text" id="name" required />

                <input type="email" id="email" required />

                <input type="tel" id="phone" required />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default JobApplication;