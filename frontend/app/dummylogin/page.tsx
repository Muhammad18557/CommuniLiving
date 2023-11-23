"use client";
import React, { useState } from 'react';
import '../dummy/dummy.css';
import Cookies from 'js-cookie';
import axios from 'axios';

function DummyLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission behavior

    const apiUrl = 'http://localhost:8000/api/login/'; // Replace with your actual API endpoint
    const csrfToken = Cookies.get('csrftoken'); // Replace with your method of getting CSRF token, if applicable

    try {
        const response = await axios.post(apiUrl, { username, password }, {
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrfToken,
            }
        });

        if (response.status === 200) {
            // Handle successful login here
            const data = response.data;
            console.log('Response:', data);
            if (data.status === 'success') {
                console.log('login successful');
                const userData = data.user;
                console.log(userData);
            }
            else {
                console.log('login failed with this message:', data.message);
            }
        } else {
            // Handle errors here
            console.error('Login failed:', response.statusText);
        }
    } catch (error) {
        if (axios.isAxiosError(error)) {
            // Handle Axios-specific error
            console.error('Axios error:', error.message);
        } else {
            // Handle other errors
            console.error('Error submitting form:', error);
        }
    }
};

  return (
    <div>
      <form className='dummy-container' onSubmit={handleSubmit}>
        <input 
          type='text' 
          placeholder='username' 
          value={username} 
          onChange={handleUsernameChange}  
        />
        <input 
          type='password' // Changed type to 'password'
          placeholder='password' 
          value={password} 
          onChange={handlePasswordChange}
        />
        <button type='submit'>Login</button>
      </form>
    </div>
  );
}

export default DummyLogin;
