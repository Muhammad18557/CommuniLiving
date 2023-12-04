"use client";
import React, { useEffect, useState } from "react";


import axios from 'axios';
import { useAuth } from "../components/Body/authentication/AuthContext";
import "./Calendar.css";
import withAuthProtection from "../components/Body/authentication/HOC";

const Calendar: React.FC = () => {
    const { user, community, setCommunity } = useAuth();
    const [currentDate, setCurrentDate] = useState(new Date());
    const [showDescription, setShowDescription] = useState(false);
    const [amenities, setAmenities] = useState<any[]>([]);
    const [messageFlag, setMessageFlag] = useState(false);
    const [selectedSlots, setSelectedSlots] = useState<{ time: string; amenityId: number }[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [bookingCreated, setBookingCreated] = useState(false);
    const [bookingError, setBookingError] = useState('');
    const [showAmenityForm, setShowAmenityForm] = useState(false);
    const [newAmenity, setNewAmenity] = useState<any>({});
    const [amenityAdded, setAmenityAdded] = useState(false);
    const [bookingSuccessMessage, setBookingSuccessMessage] = useState('');


    const handleToggleAmenityForm = () => {
        setShowAmenityForm(prev => !prev);
    };    

    const handleAmenityAdding = () => {
        const amenityData = {
            user: user.username,
            community_name: community,
            amenity_name: newAmenity.name,
            description: newAmenity.description,  
        };
        axios.post('http://localhost:8000/api/addAmenity/', amenityData)
    .then(response => {
        setNewAmenity({}); 
        if (response.status === 200) {
            setAmenityAdded(true);
            setShowAmenityForm(false); 
        }
    })
    .catch(error => {
        console.error('Error creating amenity:', error);
    });

        }

    useEffect(() => {
        const successMessage = localStorage.getItem('bookingSuccessMessage');
        if (successMessage) {
            setBookingSuccessMessage(successMessage);
            localStorage.removeItem('bookingSuccessMessage');
        }
        const formattedDate = currentDate.toISOString().split('T')[0];
      console.log(formattedDate);
      fetch(`http://localhost:8000/api/timetable/?date=${formattedDate}&community_name=${community}`)
          .then(response => response.json())
          .then(data => {
              setMessageFlag(false);
              setAmenities(data.amenities);
              console.log(data.amenities);
              if (data.amenities && data.amenities.length  === 0) {
                  setMessageFlag(true);
              }
          })
          .catch(error => console.error('Error fetching data:', error));
  }, [currentDate, community, amenityAdded]);

    const generateTimeSlots = () => {
    const slots = [];
        for (let hour = 0; hour < 24; hour++) {
            for (let minute = 0; minute < 60; minute += 30) {
                const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

                const nextHour = minute === 30 ? hour + 1 : hour;
                const nextMinute = minute === 30 ? '00' : '30';

                const endTime = `${nextHour.toString().padStart(2, '0')}:${nextMinute}`;

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

      if (!amenity) {
        setBookingError('Invalid amenity selected.');
        setIsSubmitting(false);
        return;
        }

      const bookingData = {
          user: user.username,
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
              const successMessage = `Successfully created booking for ${amenity.amenity_name} at ${selectedSlot.time} on ${currentDate.toISOString().split('T')[0]}`;
              localStorage.setItem('bookingSuccessMessage', successMessage);
              window.location.reload();
          })
          .catch(error => {
              console.error('Error creating booking:', error);
              setBookingError('An error occurred while creating the booking.');
              setIsSubmitting(false);
          });
  };

    return (
        <div className="container">
            <h1 id="main-title">{community}</h1>
            <h2 id="sub-title">Let's find an available space for your needs</h2>
            <button className='add-another-amenity' onClick={handleToggleAmenityForm}>+ Add another amenity to {community}</button>
            {showAmenityForm && 
            <div className="amenity-form">
                <form >
                    <label htmlFor="name">Amenity Name</label>
                    <input type="text" id="name" name="name" value={newAmenity.name} onChange={(e) => setNewAmenity({...newAmenity, name: e.target.value})} required placeholder="Amenity Name" />
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={newAmenity.description} onChange={(e) => setNewAmenity({...newAmenity, description: e.target.value})} placeholder="Describe the new amenity you are adding."/>
                    <button onClick={handleAmenityAdding}>Add Amenity</button>
                </form>
            </div>
            }
            {amenityAdded && <div className="amenity-added">Amenity added successfully!</div>}

            {messageFlag && <h2 className="red-message">No amenities found for this community.</h2>}

             {bookingSuccessMessage && (
            <div className="booking-success-message">
                {bookingSuccessMessage}
            </div>
            )}
            
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
                    {!messageFlag && <caption>Click on the amenities to get descriptions.</caption>}
                    
                    <thead>
                    <tr>
                        <th>Time</th>
                        {amenities.map(amenity => (
                        <th key={amenity.amenity_id} onClick={() => setShowDescription(!showDescription)} className="drop">
                            {amenity.amenity_name}
                        </th>
                        ))}
                    </tr>
                    </thead>

                    <tbody>
                        {showDescription && <tr>
                            <th>Description</th>
                            {amenities.map(amenity => (
                                <th key={amenity.amenity_id}>{amenity.description}</th>
                            ))}
                        </tr>
                            }
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

export default withAuthProtection(Calendar);
