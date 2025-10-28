import React from "react";
import "../styles/WelcomePage.css";

function WelcomePage({ onContinue }) {
  return (
    <div className="welcome-page">
      <div className="welcome-content">
        <h1>Welcome to JobBuster!</h1>
        <p>
          JobBuster is your ultimate job search assistant. Explore job opportunities, save your favorites, and get career advice with our AI-powered chatbot.
        </p>
        <button className="get-started-btn" onClick={onContinue}>
          Continue to JobBuster
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
