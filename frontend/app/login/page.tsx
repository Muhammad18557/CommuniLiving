"use client";
import axios from "axios";
import { useState } from "react";

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        {
          username: username,
          password: password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const { data } = response;

      // Store tokens in local storage
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);

      // Set authorization header for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.access}`;

      // Redirect or perform other actions upon successful login
      window.location.href = '/';
    } catch (error) {
      console.error('Login failed', error);
      // Handle login error, such as displaying an error message to the user
    }
  };

  return (
    <div className="Auth-form-container">
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <form className="Auth-form" onSubmit={submit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              className="form-control mt-1"
              placeholder="Enter Username"
              name='username'
              type='text'
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              name='password'
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;