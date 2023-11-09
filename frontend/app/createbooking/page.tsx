"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateBooking.css';

function CreateBooking() {  
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState('');
  const [date, setDate] = useState('Monday 30 October 2023');
  const [time, setTime] = useState('14:00 - 14:30');
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

  const handleAmenitySelection = (selected) => {
    setSelectedAmenity(selected);
  };
  const sharedSpaceId = 1;

  useEffect(() => {
    axios.get(`http://localhost:8000/api/amenities/${sharedSpaceId}/`)
      .then(response => {
        console.log('Response:', response.data);
        setAmenities(response.data);
        if (response.data.length > 0) {
          setSelectedAmenity(response.data[0]);
        }
      })
      .catch(error => {
        console.error('Error fetching amenities:', error);
      });
  }, []);

  return (
    <div className="booking-container">
      <h1>Create A Booking</h1>
      <br></br>
      <p>Let’s create a new booking. Share some information about your booking with us, and we’ll go ahead and place your reservation.</p>
      
      <p className='option-label'>Amenities available for booking</p>
      <div className="amenity-selection">
        {amenities.map((amenity, index) => (
          <button key={index} onClick={handleAmenitySelection}>{amenity.name}</button>
        ))}
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
