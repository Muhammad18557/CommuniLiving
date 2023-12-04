"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import '../dummy/dummy.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth } from '../components/Body/authentication/AuthContext';
import './loginNew.css'

function DummyLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [warning, setWarning] = useState(''); // New state for warning message


  const { login } = useAuth();

  const router = useRouter();  // Initialize router


  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents default form submission behavior

    const apiUrl = 'http://localhost:8000/api/login/'; 
    const csrfToken = Cookies.get('csrftoken');
    try {
        const response = await axios.post(apiUrl, { username, password }, {
            withCredentials: true,
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
                login(userData); // added this line
                console.log('this is what the cookies have now');
                console.log(Cookies.get());
                // console.log('this is what the username cookie has now');
                console.log(Cookies.get('username'));
                console.log(Cookies.get('sessionid'));
                console.log(Cookies.get('csrftoken'));
                router.push('/');
            }
            else {
                alert(data.message); // Set the warning message
                console.log('login failed with this message:', data.message);
            }
        } else {
            // Handle errors here
            console.error('Login failed:', response.statusText);
            alert('Login failed. Please try again.'); // Generic error message

        }
    } catch (error) {
        alert('An error occurred. Please try again later.'); // Generic error message
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
    <div className="dummy-container">
      <br></br>
      <br></br>
      <img
            className="logo-image"
            src="https://communitylivinginc.org/wp-content/uploads/2016/05/CLI-Logo-cropped.png"
            alt="Your Company"
          />
      <br></br>
      <br></br>
      <form className='Auth-form' onSubmit={handleSubmit}>
        <div className="Auth-form-content">
            <br></br>
            <div className="form-group">
              <input 
              type='text' 
              placeholder='Username' 
              className = 'form-control'
              value={username} 
              onChange={handleUsernameChange}  
            />
            </div>
              <div className="form-group">
                <input 
                type='password' // Changed type to 'password'
                placeholder='Password' 
                className = 'form-control'
                value={password} 
                onChange={handlePasswordChange}
              />
            
            </div>
              <div className="d-grid">
                <button type='submit' className ="btn-primary">Login</button>
              </div>
              <div className='sign-up-option'> 
                Don't have an account? <Link href="/signup" className='signup'>Sign up</Link>
              </div>
          </div>
      </form>
    </div>
  );
}

export default DummyLogin;

