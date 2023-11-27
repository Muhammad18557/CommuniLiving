"use client";
// import { useEffect, useState } from 'react';
// import './dummy.css';
// import axios from 'axios';

// function Dummy() {
//     const [key, setKey] = useState('');
//     const [text, setText] = useState('');
//     console.log('Dummy component mounted, fetching data...');
//     useEffect(() => {
//         console.log('Dummy component mounted, fetching data...');
//         axios.get('http://localhost:8000/api/dummy/')
//             .then(response => {
//                 console.log('Response:', response.data); // Log the response data
//                 setKey(response.data.key); // Update the state with the key from response
//                 setText(response.data.text); // Update the state with the value from response
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []); 
//     return (
//         <div className="dummy-container">
//             <h1>Testing Data from the backend in this Page</h1>
//             <div>
//                 <p>Key: {key}</p>
//                 <p>Text: {text}</p>
//             </div>
//         </div>
//     );
// }

// export default Dummy;

import axios from 'axios';
import { useState, useEffect } from 'react';

export const DummyComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (perform this check after a successful login)
    const accessToken = localStorage.getItem('access_token'); // Retrieve the stored token

    if (accessToken) {
      // Token exists, consider the user as logged in
      setIsLoggedIn(true);
    }
  }, []);

  const handleGetData = async () => {
    try {
      const response = await axios.get('http://localhost:8000/your-endpoint', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      });

      // Handle the response data
      console.log('Data:', response.data);
    } catch (error) {
      console.error('Error retrieving data:', error);
      // Handle error here
    }
  };

  return (
    <div>
      {isLoggedIn && ( // Conditionally render the content if the user is logged in
        <button onClick={handleGetData}>Get Data</button>
        // Other content that should be displayed when logged in
      )}
    </div>
  );
};

export default DummyComponent;

