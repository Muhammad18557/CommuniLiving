"use client";
import React, { useEffect, useState } from "react";
import "./Calendar.css";

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [amenities, setAmenities] = useState<any[]>([]);
    
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
                        <a href="https://theuselessweb.com" className="create-booking">Create Booking</a>
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
                                    const timeSlot = amenity.time_slots.find(slot => `${slot.start_time} - ${slot.end_time}` === time);
                                    const isBooked = timeSlot ? timeSlot.is_booked : false;
                                    return <td key={amenity.amenity_id} className={isBooked ? 'booked' : ''}></td>;
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
