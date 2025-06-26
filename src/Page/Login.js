import React, { useState } from 'react';
import '../css/Auth.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is installed

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('https://crypto-api-production-7139.up.railway.app//api/user/login', formData);
      const { token, user } = res.data;

      // Store token and user in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('userId', user.id);

      // Redirect after login (e.g., to dashboard)
      navigate('/home'); // or wherever you want to go
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2>LOGO With Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control auth-input"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <input
            type="password"
            className="form-control auth-input"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <button className="btn btn-success w-100 mt-3" type="submit">Login</button>
        </form>

        {error && <p className="text-danger mt-2">{error}</p>}

        <p className="switch-link mt-3">
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')} style={{ cursor: 'pointer', color: '#9624dd' }}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
