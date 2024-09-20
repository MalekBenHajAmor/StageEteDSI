import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function Navbar() {
  const { currentUser, updateUser } = useUser(); // Access the currentUser and updateUser from context
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the user context
    updateUser(null);
    // Redirect to sign-in page
    navigate('/sign_in');
  };

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><Link to="/" className="page-scroll">Home</Link></li>
            <li><Link to="/sign_up" className="page-scroll">Sign Up</Link></li>

            {currentUser ? (
              <>
                <li><span className="navbar-text">Welcome, {currentUser.username}</span></li>
                <li><button className="btn btn-custom btn-lg" onClick={handleLogout}>Logout</button></li>
              </>
            ) : (
              <li><Link to="/sign_in" className="page-scroll">Sign In</Link></li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
