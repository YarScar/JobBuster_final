import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

function ProfilePage({ user, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data from localStorage
    onLogout(); // Clear user data from app state
    navigate('/signin'); // Redirect to the Sign In page
  };

  if (!user) {
    return (
      <div className="sign-up-container">
        <h1>You are not logged in.</h1>
      </div>
    );
  }

  return (
    <div className="sign-up-container">
      <section className="hero">
        <h1>Welcome, {user.name}!</h1>
        <p>Email: {user.email}</p>
      </section>
      <button className="sign-up-button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default ProfilePage;
