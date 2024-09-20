import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = async (event) => {
    event.preventDefault();

    // Validation
    if (!username || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8082/api/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Signup failed:', errorData);
        setError('Signup failed. Please check your input.');
        return;
      }

      // Clear error and navigate to sign-in page
      setError('');
      navigate('/sign_in');
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault(); // Prevent form submission
    navigate('/sign_in'); // Navigate to the /sign_in page
  };

  return (
    <div id="contact" className="text-center">
      <div className="container">
        <div className="section-title text-center">
          <h3>Sign Up Page</h3>
        </div>
        <div className="col-md-6 col-md-offset-3">
          <form name="sentMessage" id="contactForm" noValidate onSubmit={handleSignUp}>
            <div className="form-group">
              <input
                type="text"
                id="username"
                className="form-control"
                placeholder="Username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <p className="help-block text-danger"></p>
            </div>
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
              <p className="help-block text-danger"></p>
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
              <p className="help-block text-danger"></p>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn btn-custom btn-lg">
              Sign up
            </button>
            <button type="button" className="btn btn-custom btn-lg" onClick={handleSignIn}>
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
