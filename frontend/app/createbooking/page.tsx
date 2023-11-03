"use client";
import React, { useState } from 'react';
import './CreateBooking.css';

function CreateBooking() {
  const [amenity, setAmenity] = useState('Amenity 01');
  const [date, setDate] = useState('Monday 30 October 2023');
  const [time, setTime] = useState('14:00 - 14:30');
  const [contactNumber, setContactNumber] = useState('');
  const [reservationNote, setReservationNote] = useState('');

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  const handleBooking = () => {
    // Handle the booking logic here.
  };

  return (
    <div className="booking-container">
      <h1>Create A Booking</h1>
      <br></br>
      <p>Let’s create a new booking. Share some information about your booking with us, and we’ll go ahead and place your reservation.</p>

      <p className='option-label'>Amenities available for booking</p>
      <div className="amenity-selection">
          <button onClick={() => setAmenity('Amenity 01')}>Amenity 01</button>
          <button onClick={() => setAmenity('Amenity 02')}>Amenity 02</button>
          <button onClick={() => setAmenity('Amenity 03')}>Amenity 03</button>
          <button onClick={() => setAmenity('Amenity 04')}>Amenity 04</button>
      </div>

      <p className='option-label'>Select date and time</p>

      <div className="booking-date-input">
        <label htmlFor="booking-date"></label>
        <input
        id="booking-date"
        className = "booking-date-input"
        type="datetime-local"
        name="booking-date"
        value={getCurrentDateTime()} />
      </div>
  
      <p className='option-label'>Notes for Others</p>
      <div className="reservation-notes">
        <textarea placeholder="Study Session" value={reservationNote} onChange={(e) => setReservationNote(e.target.value)}></textarea>
      </div>
      <button className="confirm-booking" onClick={handleBooking}>Confirm Booking</button>
    </div>
  );
}

export default CreateBooking;
