"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateBooking.css';

function CreateBooking() {  
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState('');
  const [date, setDate] = useState('Monday 30 October 2023');
  const [time, setTime] = useState('14:00 - 14:30');
  const [contactNumber, setContactNumber] = useState('');
  const [reservationNote, setReservationNote] = useState('');

  const handleBooking = () => {
    // Handle the booking logic here.
  };

  const handleAmenitySelection = (selected) => {
    setSelectedAmenity(selected);
  };

  useEffect(() => {
    axios.get('http://localhost:8000/api/amenity/')
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
