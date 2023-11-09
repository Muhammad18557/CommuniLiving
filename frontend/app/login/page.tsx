"use client"
import { useState } from 'react';
import axios from 'axios';

import Auth from "../components/Body/authentication/Auth";

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [loginSuccess, setLoginSuccess] = useState(false); // State for successful login
  const [userDetails, setUserDetails] = useState(null); // State to store user details

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/accounts/login/', formData);
      console.log('User logged in:', response.data);
      // Handle successful login, e.g., save tokens, update state, etc.
      setUserDetails(response.data); // Store user details upon successful login
      setLoginSuccess(true);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, e.g., show error message
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if formData contains the necessary fields
    if (formData.username.trim() !== '' && formData.password.trim() !== '') {
      await handleLogin();
    } else {
      console.error('Please provide username and password');
    }
  };
  
  // Render a form for login, with inputs and a submit button
  return (
    <div>
      <Auth isSignUp={false} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
      {loginSuccess && userDetails && (
        <div>
          <p>Login successful! User details:</p>
          <p>Username: {userDetails.username}</p>
          {/* Display other user details */}
        </div>
      )}
    </div>
  );
};

export default Login;
