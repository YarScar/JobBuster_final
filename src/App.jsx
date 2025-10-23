import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Contact from './pages/ContactPage';
import SignUp from './pages/SignUpPage';
import Stars from './components/Stars'; // Import Stars component
import './index.css'; // use index.css since it contains global styles
import './styles/Navbar.css'; // import Navbar styles
import './styles/JobCard.css'; // import JobCard styles
import './App.css'; // import App specific styles
import './styles/SearchBar.css'; // import SearchBar styles
import './styles/ChatBot.css'; // import ChatBot styles
import './styles/SignUp.css'; // import SignUp styles
import JobDetailsPage from './pages/JobDetailsPage'; // Import JobDetailsPage
import FavoritesPage from './pages/FavoritesPage'; // Import FavoritesPage
import { FavoritesProvider } from './context/FavoritesContext'; // Import FavoritesProvider

function App() {
  // Check localStorage for saved theme preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Apply dark mode class to body when state changes
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
    setDarkMode(prev => !prev);
  };

  return (
    <FavoritesProvider>
      <Router>
        <div className="app">
          <Stars /> {/* Add Stars component */}
          <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
          <Navbar />

          {/* Routes */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<div className="page-wrapper"><Contact /></div>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/job/:id" element={<JobDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </FavoritesProvider>
  );
}

export default App;
