import { Link } from "react-router-dom";

function Navbar({ user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="logo">JobBuster</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/favorites">Favorites</Link></li>
        {user ? (
          <>
            <li className="user-name">Welcome, {user.name}</li>
            <li>
              <button onClick={onLogout} className="logout-btn">
                Log Out
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link to="/signup" className="signup-btn">Sign Up / Sign In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;