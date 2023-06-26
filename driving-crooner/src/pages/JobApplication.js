import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function JobApplication() {
    const [submitted, setSubmitted] = useState(false);
    const [volunteer, setVolunteer] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (submitted) {
            setVolunteer(true);
        } else {
            setSubmitted(true);
        }
    };

    return (
        <div>
            <Link to="/">Home</Link>
            <h1>The Driving Crooner</h1>
            <h2>Job Application</h2>
            {submitted ? (
                volunteer ? (
                    <p>Your job application has been submitted as a volunteer role. Thank you!</p>
                ) : (
                    <p>Your job application has already been submitted. Thank you!</p>
                )
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
