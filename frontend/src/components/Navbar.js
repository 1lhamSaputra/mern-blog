import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../helpers/AuthContext';

const Navbar = () => {
  const { isLoggedIn, handleLogout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark p-2">
      <Link className="navbar-brand text-info" to="#">DigiBlog</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link text-info" to="/">Home</Link>
          </li>
          {isLoggedIn ? (
            <li className="nav-item">
              <Link className="nav-link text-info" to="/posts">Post</Link>
            </li>
          ) : ''}
        </ul>
      </div>
      <div className="ml-auto"> {/* Use ml-auto class for right alignment */}
        <ul className="navbar-nav">
          <li className="nav-item">
            {isLoggedIn ? (
              <Link className="nav-link text-info" to="#" onClick={handleLogout}>Logout</Link>
            ) : (
              <Link className="nav-link text-info" to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
