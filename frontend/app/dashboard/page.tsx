// import React from "react";
// import BookingCard from '../components/BookingCard/BookingCard';
// import "./userDashboard.css";
// import bookingData from './bookingData.json';
// import Link from 'next/link'; 
"use client";
import React from 'react';
import { useAuth } from '../components/Body/authentication/AuthContext';
import BookingCard from '../components/BookingCard/BookingCard';
import bookingData from './bookingData.json';
import Link from 'next/link';
import './userDashboard.css';

export const Dashboard = () => {
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
      
    </div>

  );
};

// export default Dashboard;

export const UserDashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="user-dashboard-page">
        <p>You are not logged in. Please <Link href="/dummylogin">log in</Link> to access the dashboard.</p>
        <p>You are not logged in. Please <Link href="/dummylogin">log in</Link> to access the dashboard.</p>
        <p>You are not logged in. Please <Link href="/dummylogin">log in</Link> to access the dashboard.</p>
        <p>You are not logged in. Please <Link href="/dummylogin">log in</Link> to access the dashboard.</p>
        <p>You are not logged in. Please <Link href="/dummylogin">log in</Link> to access the dashboard.</p>
        <p>You are not logged in. Please <Link href="/dummylogin">log in</Link> to access the dashboard.</p>
        <p>You are not logged in. Please <Link href="/dummylogin">log in</Link> to access the dashboard.</p>
        <p>You are not logged in. Please <Link href="/dummylogin">log in</Link> to access the dashboard.</p>
        <p>You are not logged in. Please <Link href="/dummylogin">log in</Link> to access the dashboard.</p>
        <p>You are not logged in. Please <Link href="/dummylogin">log in</Link> to access the dashboard.</p>
      </div>
    );
  }

  return (
   <Dashboard />
  );
};

export default UserDashboard;



