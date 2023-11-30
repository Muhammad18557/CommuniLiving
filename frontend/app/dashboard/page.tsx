// import React from "react";
// import BookingCard from '../components/BookingCard/BookingCard';
// import "./userDashboard.css";
// import bookingData from './bookingData.json';
// import Link from 'next/link'; 
"use client";
import { useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useAuth } from '../components/Body/authentication/AuthContext';
import BookingCard from '../components/BookingCard/BookingCard';
import bookingData from './bookingData.json';
import Link from 'next/link';
import './userDashboard.css';
import DummyLogin from '../dummylogin/page';

export const Dashboard = () => {
  const [communityCode, setCommunityCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission

    // Axios POST request
    axios.post('http://localhost:8000/api/add_user_community/', {
      user: "admin",
      community_pass: communityCode
    })
    .then(response => {
      console.log(response.data);
      // Handle successful response
    })
    .catch(error => {
      console.error('Error posting data', error);
      // Handle error
    });
};

  return (
    <div className="user-dashboard-page">
      <div className="div">
        <div className="page-intro">
          <div className="page-title"><h1>User Dashboard</h1></div>
          <div> Sample Booking Form (To be changed to calender later)
            <Link href='/createbooking' style={{ color: 'green' }}> Booking Page for a Community</Link>
          </div>
          <div className="page-info"><h5>Here are your communities</h5></div>
        </div>
      </div>
      <div className='card-container'>
        {bookingData.map((booking) => (
          <BookingCard
            key={booking.id}
            name={booking.name}
            location={booking.location}
            members={booking.members}
            amenities={booking.amenities}
            adminContact={booking.adminContact}
          />
        ))}
      </div>

      <div>
        <form onSubmit={handleSubmit}>
        <label htmlFor="communityCode">Community Code</label>
        <input 
          type="text" 
          id="communityCode" 
          name="communityCode" 
          value={communityCode}
          onChange={(e) => setCommunityCode(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      </div>

      
    </div>

  );
};

// export default Dashboard;

// export const UserDashboard = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return (
//       <DummyLogin />
//     );
//   }
//   return (
//    <Dashboard />
//   );
// };

// export default UserDashboard;


import withAuthProtection from '../components/Body/authentication/HOC';

const UserDashboard = () => {
  return (
    <Dashboard />
  );
};

export default withAuthProtection(UserDashboard);


