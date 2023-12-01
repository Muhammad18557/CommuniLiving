"use client";
import React, { useState } from 'react';
import '../dummy/dummy.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useAuth } from '../components/Body/authentication/AuthContext';

function DummyLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuth();

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
          </div>
      </form>
    </div>
  );
}

export default DummyLogin;




// export default function Example() {
//   return (
//     <>
//       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
//       <div>
//             <br/>
//             <br/>
//             <br/>
//             <br/>
//             <br/>
//       </div>
//         <div className="sm:mx-auto sm:w-full sm:max-w-sm">
//         <img
//             className="mx-auto h-10 w-auto"
//             src="https://communitylivinginc.org/wp-content/uploads/2016/05/CLI-Logo-cropped.png"
//             alt="Your Company"
//           />
//           <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
//             Sign in to your account
//           </h2>
//         </div>

//         <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
//           <form className="space-y-6" action="#" method="POST">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
//                 Email address
//               </label>
//               <div className="mt-2">
//                 <input
//                   id="email"
//                   name="email"
//                   type="email"
//                   autoComplete="email"
//                   required
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             <div>
//               <div className="flex items-center justify-between">
//                 <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
//                   Password
//                 </label>
//               </div>
//               <div className="mt-2">
//                 <input
//                   id="password"
//                   name="password"
//                   type="password"
//                   autoComplete="current-password"
//                   required
//                   className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//                 />
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//               >
//                 Sign in
//               </button>
//             </div>
//           </form>

//         </div>
//       </div>
//     </>
//   )
// }