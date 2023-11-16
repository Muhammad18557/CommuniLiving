import React from "react";
import BookingCard from '../components/BookingCard/BookingCard';
import "./userDashboard.css";
import bookingData from './bookingData.json';

export const UserDashboard = () => {
  return (
    <div className="user-dashboard-page">
      <div className="div">
        <div className="page-intro">
          <div className="page-title"><h1>User Dashboard</h1></div>
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

export default UserDashboard;