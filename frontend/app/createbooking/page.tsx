"use client";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import "./Calendar.css";

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [amenities, setAmenities] = useState<any[]>([]);
    const [selectedSlots, setSelectedSlots] = useState<{ time: string; amenityId: number }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingCreated, setBookingCreated] = useState(false);
    const [bookingError, setBookingError] = useState('');
    
    useEffect(() => {
        fetch('http://localhost:8000/api/timetable/')
            .then(response => response.json())
            .then(data => {
                setAmenities(data.amenities);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const generateTimeSlots = () => {
        const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
                const endTime = `${hour.toString().padStart(2, '0')}:${(minute + 30).toString().padStart(2, '0')}`;
                slots.push(`${startTime} - ${endTime}`);
            }
        }
        return slots;
    };

    const handleDateChange = (offset: number) => {
        setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth(), prev.getDate() + offset));
    };

    const timeSlots = generateTimeSlots();

    const toggleHighlight = (time: string, amenityId: number) => {
        const isHighlighted = selectedSlots.some(cell => cell.time === time && cell.amenityId === amenityId);
        if (isHighlighted) {
            setSelectedSlots(selectedSlots.filter(cell => cell.time !== time || cell.amenityId !== amenityId));
        } else {
            setSelectedSlots([...selectedSlots, { time, amenityId }]);
        }
    };

    const isCellHighlighted = (time: string, amenityId: number) => {
        return selectedSlots.some(cell => cell.time === time && cell.amenityId === amenityId);
    };

    const createBooking = () => {
      if (selectedSlots.length === 0) {
          setBookingError('Please select a time slot to book.');
          return;
      }
      setIsSubmitting(true);
      // for now, just taking the first picked slot for the booking
      // do we wanna try to handle multiple slots?
      const selectedSlot = selectedSlots[0];
      const amenity = amenities.find(a => a.amenity_id === selectedSlot.amenityId);
      if (!amenity) {
          setBookingError('Invalid amenity selected.');
          setIsSubmitting(false);
          return;
      }
      const bookingData = {
          amenity: amenity.amenity_id,
          date: currentDate.toISOString().split('T')[0],
          start_time: selectedSlot.time.split(' - ')[0],
          end_time: selectedSlot.time.split(' - ')[1],
          notes: '' // do we want this field to collect notes?
      };
      axios.post('http://localhost:8000/api/bookings/', bookingData)
          .then(response => {
              setBookingCreated(true);
              setIsSubmitting(false);
          })
          .catch(error => {
              console.error('Error creating booking:', error);
              setBookingError('An error occurred while creating the booking.');
              setIsSubmitting(false);
          });
  };

    return (
        <div className="container">
            <h1 id="main-title">Community Name</h1>
            <h2 id="sub-title">Let's find an available space for your needs</h2>
            
            <div className="table-wrapper">
                <div className="controls">
                    <div className="date-control">
                        <button onClick={() => handleDateChange(-1)}>&lt;</button>
                        <span>{currentDate.toISOString().split('T')[0]}</span>
                        <button onClick={() => handleDateChange(1)}>&gt;</button>
                    </div>
                    <div className="booking-control">
                      <button onClick={createBooking} className="create-booking" disabled={isSubmitting}>
                        {isSubmitting ? 'Creating Booking...' : 'Create Booking'}
                      </button>
                        {bookingError && <div className="booking-error">{bookingError}</div>}
                    </div>
                </div>
                <table id="scheduleTable">
                    <thead>
                        <tr>
                            <th>Time</th>
                            {amenities.map(amenity => (
                                <th key={amenity.amenity_id}>{amenity.amenity_name}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                      {timeSlots.map(time => (
                          <tr key={time}>
                              <td>{time}</td>
                              {amenities.map(amenity => {
                                  const timeSlot = amenity.time_slots.find(slot => 
                                      `${slot.start_time} - ${slot.end_time}` === time);
                                  const isBooked = timeSlot ? timeSlot.is_booked : false;
                                  const isHighlighted = isCellHighlighted(time, amenity.amenity_id);
                                  return (
                                      <td 
                                          key={amenity.amenity_id} 
                                          className={`${isBooked ? 'booked' : ''} ${isHighlighted ? 'highlighted' : ''}`}
                                          onClick={() => toggleHighlight(time, amenity.amenity_id)}
                                      ></td>
                                  );
                              })}
                          </tr>
                      ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Calendar;
