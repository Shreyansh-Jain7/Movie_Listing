import React, { useState } from 'react';
import axios from 'axios';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      // Send a signup request to the backend
      const response = await axios.post('https://movie-list-backend-8nzr.onrender.com/signup', {
        email,
        password,
      });
      console.log('Signup successful:', response.data);
      // Redirect or perform other actions as needed
    } catch (error) {
      console.error('Signup failed:', error.msg);
      // Handle errors, e.g., show an error message to the user
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
