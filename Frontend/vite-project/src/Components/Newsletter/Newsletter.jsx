// just_home/Frontend/vite-project/src/Components/Newsletter/Newsletter.jsx

import React, { useState } from "react";
import axios from "axios";
import "./Newsletter.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter a valid email.");
      return;
    }

    try {
      const response = await axios.post("https://just-home.onrender.com/stayuptothedate", { email });
      if (response.status === 200) {
        setMessage("Successfully subscribed!");
        setEmail(""); // Clear input field
      } else {
        setMessage("Subscription failed. Please try again.");
      }
    } catch (error) {
      setMessage("Error: Unable to subscribe. Try again later.");
    }
  };

  return (
    <div className="newsletter-container">
      <div className="newsletter-content">
        <img 
          src="https://res.cloudinary.com/dmfjcttu9/image/upload/v1740157223/yeg6qxpzkocpbg5kr221.png" 
          alt="Newsletter Icon" 
          className="newsletter-icon" 
        />
        <h2 className="newsletter-title">Stay Up to Date</h2>
        <p className="newsletter-subtitle">
          Subscribe to our newsletter to receive our weekly feed.
        </p>

        {/* Input and Button */}
        <div className="newsletter-input-container">
          <input
            type="email"
            placeholder="Your e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-input"
          />
          <button className="newsletter-button" onClick={handleSubscribe}>
            Send <span className="arrow">→</span>
          </button>
        </div>

        {/* Display message after submission */}
        {message && <p className="newsletter-message">{message}</p>}
      </div>

      {/* Footer Section */}
      <div className="footer1">
        <p className="footer-text">Copyright © 2024. JustHome</p>


      </div>
    </div>
  );
};

export default Newsletter;
