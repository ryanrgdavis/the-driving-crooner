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
                <button onClick={handleApplyAgain} className="job-application-button">Apply Again</button>
                <div className="paragraph">
                    <p>In life, we often come across obstacles and challenges that test our determination and resilience. We strive to achieve our dreams, pursue our passions, and make a meaningful impact on the world. However, the path to success is rarely a smooth one. It is marked by ups and downs, victories and defeats, and perhaps most notably, the bitter taste of rejection.</p>
                    <p>It is through perseverance that we discover our true potential. We learn that failure is not an indication of inadequacy but rather a stepping stone towards growth. The most successful people in history have faced countless rejections, setbacks, and failures. Yet, they never allowed themselves to be defined by these experiences. Instead, they used them as fuel to propel themselves forward, armed with a renewed sense of purpose and an unwavering belief in their abilities.</p>
                    <p>So, my friend, I implore you to try hard, and when you think you've given it your all, dig deeper. Embrace rejection as a testament to your courage and resilience. Let it be the catalyst that drives you to go the extra mile, to push beyond your comfort zone, and to become the best version of yourself.</p>
                    <p>Remember, the path to success is paved with rejection. It is a journey that requires unwavering determination, a resilient spirit, and an unyielding belief in your worth. So, when faced with rejection, stand tall, dust yourself off, and keep pushing forward. Your breakthrough awaits, and it is within your reach if you dare to try, dare to face rejection, and dare to believe in your limitless potential.</p>
                </div>
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