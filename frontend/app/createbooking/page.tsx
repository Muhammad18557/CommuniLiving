"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateBooking.css';

function CreateBooking() { 
  
  const getCurrentDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const getCurrentTime = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  }

  const validateTimes = () => {
    const start = new Date(`${bookingDate}T${startTime}`);
    const end = new Date(`${bookingDate}T${endTime}`);
    
    if (start >= end) {
      setBookingError('Start time must be earlier than end time.');
      return false; 
    }
    return true; 
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingCreated, setbookingCreated] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenity, setSelectedAmenity] = useState();
  const [reservationNote, setReservationNote] = useState('');
  const [bookingDate, setBookingDate] = useState(getCurrentDate());
  const [startTime, setStartTime] = useState(getCurrentTime());
  const [endTime, setEndTime] = useState(getCurrentTime());
  const [bookingError, setBookingError] = useState('');


  const handleBooking = () => {
    setIsSubmitting(true);
    if (!validateTimes()) {
      setIsSubmitting(false);
      return;
    }
    const bookingData = {
      amenity: selectedAmenity.id,
      date: bookingDate,
      start_time: startTime,
      end_time: endTime,
      notes: reservationNote
    };
    console.log('Booking data:', bookingData);

    setTimeout(() => {
      axios.post('http://localhost:8000/api/bookings/', bookingData)
        .then(response => {
          console.log('Response:', response.data);
          setBookingError('');
          setbookingCreated(true);
        })
        .catch(error => {
          console.error('Error creating booking:', error);
          if (error.response && error.response.status === 400) {
            // Assuming the server returns status 400 for booking conflicts
            setBookingError('This booking slot is already taken. Please choose another time.');
            setIsSubmitting(false);
          } else {
            setBookingError('An error occurred while creating the booking.');
            setIsSubmitting(false);
          }
        });
      }, 1500)
  };

  const handleAmenitySelection = (amenity) => {
    setSelectedAmenity(amenity);
  };
  const sharedSpaceId = 1;
  // const userId = 1; //hard coding for now until we have login functionality

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

  if (bookingCreated) {
    return (
      <div className="booking-container">
        <h1>Booking Created Successfully</h1>
        <p className='success-booking'>Your request has been received and your booking has been created. Thank you for using CommuniLiving!</p>
        <div className="links-to-dashboard-and-bookings">
          <a href="/dashboard">Back to Dashboard</a>
          <a href="/bookings">View Bookings</a>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-container">
      <h1>Create A Booking</h1>
      <br></br>
      <p>Let’s create a new booking. Share some information about your booking with us, and we’ll go ahead and place your reservation.</p>
      
      <p className='option-label'>Amenities available for booking</p>
      <div className="amenity-selection">
      {amenities.map((amenity, index) => (
        <button
          key={index}
          onClick={() => handleAmenitySelection(amenity)}
          style={{ backgroundColor: selectedAmenity && selectedAmenity.id === amenity.id ? '#557D71' : '', 
                  color: selectedAmenity && selectedAmenity.id === amenity.id ? 'white' : ''
}}
        >
        {amenity.name}
        </button>
      ))}
      </div>
    <p className='option-label'>Select date</p>
    <div className="booking-date-input">
      <input
        type="date"
        value={bookingDate}
        onChange={(e) => setBookingDate(e.target.value)}
      />
    </div>

      <p className='option-label'>Select start time</p>
      <div className="booking-time-input">
        <input
          type="time"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </div>


      <p className='option-label'>Select end time</p>
      <div className="booking-time-input">
        <input
          type="time"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>

      {bookingError && <div className="booking-error">{bookingError}</div>} {/* Display the error message if any */}
  
      <p className='option-label'>Notes for Others</p>
      <div className="reservation-notes">
        <textarea placeholder="Study Session" value={reservationNote} onChange={(e) => setReservationNote(e.target.value)}></textarea>
      </div>
      <button
        className="confirm-booking"
        style={{ backgroundColor: isSubmitting ? "grey" : "" }}
        onClick={handleBooking}
        disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Create Booking'}
     </button>
      </div>
  );
}

export default CreateBooking;
