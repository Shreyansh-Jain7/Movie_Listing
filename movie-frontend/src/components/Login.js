import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send a login request to the backend
      const response = await axios.post('https://movie-list-backend-8nzr.onrender.com/login', {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      // Redirect or perform other actions as needed
    } catch (error) {
      console.error('Login failed:', error.msg);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
