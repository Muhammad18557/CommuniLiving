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
import './userDashboard.css';

export const Dashboard = () => {

  const [communityCode, setCommunityCode] = useState('');
  const [communityName, setCommunityName] = useState('');
  const [communityLocation, setCommunityLocation] = useState('');
  const [communityDescription, setCommunityDescription] = useState('');
  const [newCommunityCode, setNewCommunityCode] = useState('');
  const [noCommunity, setNoCommunity] = useState(false);

  const [communities, setCommunities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, setCommunityData } = useAuth();

  const handleCreateCommunity = () => {
    const communityData = {
      community_name: communityName,
      community_location: communityLocation,
      community_description: communityDescription,
      user: user.username
    };

    axios.post('http://localhost:8000/api/addCommunity/', communityData)
    .then(response => {
      console.log(response.data);
      setCommunityData(response.data);
      if (response.data.status === "success") {
        setNewCommunityCode(response.data.join_pass);
      }
    })
    .catch(error => {
      console.error('Error posting data', error);
    });
  }

  useEffect(() => {
    if (!user) {
      return;
    }
    let url = `http://localhost:8000/api/get_user_communities/?username=${encodeURIComponent(user.username)}&details=1`;
    axios.get(url)
      .then(response => {
        console.log(response)
        console.log(response.data.communities);
        if (response.data.communities && response.data.communities.length === 0) {
          setNoCommunity(true);
        }
        else {
          setNoCommunity(false);
        }
        setCommunities(response.data.communities);
        console.log("communities: ", communities)
        setError("");
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
    }, [communityCode, newCommunityCode]);


  const handleSubmit = (e) => {
    e.preventDefault(); // Prevents the default form submission

    // Axios POST request
    axios.post('http://localhost:8000/api/add_user_community/', {
      user: user.username,
      community_pass: communityCode
    })
    .then(response => {
      console.log(response.data);

    })
    .catch(error => {
      console.error('Error posting data', error);
      alert("Error adding you to this community.");
    });
};

  return (
    <div className="user-dashboard-page">
      <div className="div">
        <div className="page-intro">
          <br></br>
          <div className="page-title"><h1>Welcome to your Dashboard, {user.username}</h1></div>
          <div className="page-info">{ communities.length != 0 ? <h5>Here are your communities</h5> : <h5>You aren't a part of any community yet.</h5>}</div>
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

      <div className='create-community'>
        {newCommunityCode && 
          <div className='option-heading'>Your newly created Community's Code is: {newCommunityCode}</div>
        }
          <div className='option-heading'>Create A New Community </div>
          <form className='create-community-form'>
          <label htmlFor="communityName">Community Name</label>
          <input 
            type="text" 
            id="communityName" 
            name="communityName" 
            value={communityName}
            onChange={(e) => setCommunityName(e.target.value)}
          />
          <label htmlFor="communityLocation">Community Location</label>
          <input 
            type="text" 
            id="communityLocation" 
            name="communityLocation" 
            value={communityLocation}
            onChange={(e) => setCommunityLocation(e.target.value)}
          />
          <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={communityDescription}
          onChange={(e) => setCommunityDescription(e.target.value)}
        />
          <button type="submit" onClick={handleCreateCommunity}>Submit</button>
          </form>
      </div>

      <div className = "communityCode">
        <div className='option-heading'>Join an existing Community</div>
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


