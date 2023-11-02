"use client";
import React, { useState } from 'react';
import './CreateBooking.css';
function CreateBooking() {
  const [amenity, setAmenity] = useState('Amenity 01');
  const [date, setDate] = useState('Monday 30 October 2023');
  const [time, setTime] = useState('14:00 - 14:30');
  const [contactNumber, setContactNumber] = useState('');
  const [reservationNote, setReservationNote] = useState('');

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
      <div className='date-and-time'>
        <div className="date-selection">
          <input type="text" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className="time-selection">
        <input type="text" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
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
