import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/HomePage';
import About from './pages/AboutPage';
import Contact from './pages/ContactPage';
import SignUp from './components/SignUp';
import { JobAssistant } from './components/JobAssistant';
import './index.css'; // use index.css since it contains global styles
import './styles/Navbar.css'; // import Navbar styles
import './styles/JobCard.css'; // import JobCard styles
import './App.css'; // import App specific styles
import './styles/SearchBar.css'; // import SearchBar styles

function App() {
  // Check localStorage for saved theme preference
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // Job Assistant state
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);

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

  const toggleAssistant = () => {
    setIsAssistantOpen(prev => !prev);
  };

  return (
    <Router>
      <div className="app">
        {/* Dark Mode Toggle Button */}
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
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        {/* Global Job Assistant Component */}
        <JobAssistant 
          jobContext={null} 
          isOpen={isAssistantOpen} 
          onClose={() => setIsAssistantOpen(false)} 
        />
      </div>

      {/* Job Assistant Toggle Button */}
      <button
        className="assistant-toggle"
        onClick={toggleAssistant}
        aria-label="Toggle job assistant"
      >
        🤖
      </button>
    </Router>

    
  );
}

export default App;