// import React from "react";
// import BookingCard from '../components/BookingCard/BookingCard';
// import "./userDashboard.css";
// import bookingData from './bookingData.json';
// import Link from 'next/link'; 
"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import axios from 'axios';
import { useAuth } from '../components/Body/authentication/AuthContext';
import BookingCard from '../components/BookingCard/BookingCard';
// import bookingData from './bookingData.json';
import Link from 'next/link';
import './userDashboard.css';

export const Dashboard = () => {

  const [communityCode, setCommunityCode] = useState('');
  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, setCommunityData } = useAuth();

  useEffect(() => {
    if (!user) {
      return;
    }
    let url = `http://localhost:8000/api/get_user_communities/?username=${encodeURIComponent(user.username)}&details=1`;
    axios.get(url)
      .then(response => {
        console.log(response)
        console.log(response.data.communities);
        setCommunities(response.data.communities);
        setError("");
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
    }, [communityCode]);


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission

    // Axios POST request
    axios.post('http://localhost:8000/api/add_user_community/', {
      user: "admin",
      community_pass: communityCode
    })
    .then(response => {
      console.log(response.data);
      // Handle successful response
    })
    .catch(error => {
      console.error('Error posting data', error);
      // Handle error
    });
};

  return (
    <div className="user-dashboard-page">
      <div className="div">
        <div className="page-intro">
        <div className="page-title"><h1>....</h1></div>
          <div className="page-title"><h1>User Dashboard</h1></div>
          <div className="page-info">{ communities ? <h5>Here are your communities</h5> : <h5>You aren't a part of any community yet.</h5>}</div>
        </div>
      </div>
      <div className='card-container'>
        {communities && communities.map((community) => (
          <BookingCard
            key={community.id}
            name={community.community_name}
            location={community.location}
            members={community.join_pass}
            amenities=""
            adminContact=""
          />
        ))}
      </div>

      <div className = "communityCode">
        <form onSubmit={handleSubmit}>
        <label htmlFor="communityCode">Community Code</label>
        <input 
          type="text" 
          id="communityCode" 
          name="communityCode" 
          value={communityCode}
          onChange={(e) => setCommunityCode(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      </div>

      
    </div>

  );
};

import withAuthProtection from '../components/Body/authentication/HOC';

const UserDashboard = () => {
  return (
    <Dashboard />
  );
};

export default withAuthProtection(UserDashboard);


