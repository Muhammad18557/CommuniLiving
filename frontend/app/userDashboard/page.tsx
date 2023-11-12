import React from "react";
import BookingCard from '../components/BookingCard/BookingCard';
import "./userDashboard.css";
import bookingData from './bookingData.json';

export const UserDashboard = () => {
  return (
    <div className="user-dashboard-page">
      <div className="div">
        <div className="page-intro">
          <div className="page-title">User Dashboard</div>
          <div className="page-info">Here are your communities.</div>
        </div>
      </div>

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

  );
};

export default UserDashboard;