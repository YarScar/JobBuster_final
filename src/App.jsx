import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Contact from './pages/ContactPage';
import Stars from './components/Stars';
import './index.css';
import './styles/Navbar.css';
import './styles/JobCard.css';
import './App.css';
import './styles/SearchBar.css';
import './styles/ChatBot.css';
// Removed signup/profile related pages and styles
import JobDetailsPage from './pages/JobDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import { FavoritesProvider } from './context/FavoritesContext';
import WelcomePage from './pages/WelcomePage'; // Import the WelcomePage

function App() {
  // Auth/user state removed (signup/profile/logout removed)
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });
  const [showWelcome, setShowWelcome] = useState(true); // State to manage the WelcomePage visibility

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // handleSignUp / handleSignIn / handleLogout removed

  const handleContinue = () => {
    setShowWelcome(false); // Hide the WelcomePage when the user clicks "Continue"
  };

  if (showWelcome) {
    return <WelcomePage onContinue={handleContinue} />; // Render the WelcomePage first
  }

  return (
    <FavoritesProvider>
      <Router>
        <div className="app">
          <Stars />
          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            {/* Signup / Signin / Profile routes removed */}
            <Route path="/job/:id" element={<JobDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
