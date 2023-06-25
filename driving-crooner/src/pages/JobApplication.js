import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function JobApplication() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div>
            <Link to="/">Home</Link>
            <h1>The Driving Crooner</h1>
            <h2>Job Application</h2>
            {submitted ? (
                <p>Your job application has been submitted. Thank you!</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input type="text" />
                    </label>
                    <br />
                    <label>
                        Email:
                        <input type="email" />
                    </label>
                    <br />
                    <label>
                        Phone:
                        <input type="tel" />
                    </label>
                    <br />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
}

export default JobApplication;