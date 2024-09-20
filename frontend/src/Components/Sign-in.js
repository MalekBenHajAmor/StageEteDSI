import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function SignIn() {
  const { updateUser } = useUser(); // Access the updateUser function from context
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignIn = (event) => {
    event.preventDefault();

    fetch('http://localhost:8082/api/users/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.id) {
          console.log('User data received:', data); // Debugging line
          updateUser(data); // Update user context
          
          // Check if the user is an admin
          if (data.role === 
            "admin\n") {
            navigate('/BackOffice'); // Redirect to BackOffice if admin
          } else {
            navigate('/'); // Redirect to home page for other users
          }
        } else {
          setError(data.error || 'Sign-in failed');
        }
      })
      .catch(error => {
        console.error('Error during sign-in:', error);
        setError(error.message || 'An error occurred during sign-in');
      });
  };

  const handleSignUp = (event) => {
    event.preventDefault();
    navigate('/sign_up');
  };

  return (
    <div id="contact" className="text-center">
      <div className="container">
        <div className="section-title text-center">
          <h3>Sign In Page</h3>
        </div>
        <div className="col-md-6 col-md-offset-3">
          <form id="contactForm" noValidate onSubmit={handleSignIn}>
            <div className="form-group">
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-custom btn-lg">
              Sign in
            </button>
            <button type="button" className="btn btn-custom btn-lg" onClick={handleSignUp}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
