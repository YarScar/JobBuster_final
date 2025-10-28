import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';

function SignInPage({ onSignIn }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (!storedUser || storedUser.email !== formData.email) {
      setError('Invalid email or user does not exist.');
      return;
    }

    // Simulate password validation (for demo purposes)
    if (formData.password !== 'password123') {
      setError('Incorrect password.');
      return;
    }

    onSignIn(storedUser); // Update the app state with the user data
    navigate('/profile'); // Redirect to the profile page
  };

  return (
    <div className="sign-up-container">
      <section className="hero">
        <h1>Sign In</h1>
        <p>Welcome back! Sign in to access your account.</p>
      </section>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="sign-up-button">Sign In</button>
      </form>
    </div>
  );
}

export default SignInPage;
