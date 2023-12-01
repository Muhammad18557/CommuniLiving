// import React from "react";
// import AnnoucementCard from '../components/AnnoucementCard/AnnoucementCard';
// import "./annoucementDashboard.css";
// import announcementData from './annoucementData.json';

// export const AnnoucementDashboard = () => {

//   return (
//     <div className="annoucement-container">
//       <div className="annoucement-dashboard-page">
//         <div className="div">
//           <div className="page-intro">
//             <div className="page-title"><h1>Announcements</h1></div>
//           </div>
//         </div>
//         <br></br>
//         <div className='card-container'>
//           {announcementData.map((annoucement) => (
//             <AnnoucementCard
//               key={annoucement.id}
//               name={annoucement.name}
//               person={annoucement.person}
//               message={annoucement.message}
//               phone={annoucement.phone}
//               mail={annoucement.mail}
//               date={annoucement.date}
//             />
//           ))}
//         </div>
//         <p className='annoucement-title'>Make Announcement to Community</p>
//         <div className="annoucement-notes">
//           <textarea placeholder="Annoucement"></textarea>
//         </div>
//         <button className="confirm-booking">Confirm Annoucement</button>
//       </div>
//     </div>
    

//   );
// };

// export default AnnoucementDashboard;

"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnnoucementCard from '../components/AnnoucementCard/AnnoucementCard';
import './annoucementDashboard.css';
import { useAuth } from '../components/Body/authentication/AuthContext';
import DummyLogin from '../dummylogin/page';
import withAuthProtection from '../components/Body/authentication/HOC';



export const AnnoucementDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [communities, setCommunities] = useState([]);
  const [selectCommunity, setSelectCommunity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useAuth();
  
  const currentUser = { 
    username: user ? user.username : 'admin' // If 'user' is defined, use 'user.username', otherwise default to 'thomas'
  };
  // console.log("current user is", currentUser);
  

  useEffect(() => {
    setIsLoading(true);
    // Construct the URL with a query parameter for the username
    const url = `http://localhost:8000/api/message/?username=${encodeURIComponent(currentUser.username)}`;

    axios.get(url) // Use the URL with the query parameter
      .then(response => {
        // console.log(response.data.messages);
        setAnnouncements(response.data.messages); // Assuming the response data is the array of announcements
        setError(null);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [currentUser.username]);


  const postAnnouncement = () => {
    if (!newAnnouncement) {
      setError("Announcement cannot be empty!");
      return;
    }
    if (!selectCommunity) {
      setError("Please select a community!");
      return;
    }

    axios.post("http://localhost:8000/api/message/", {
      "username": currentUser.username, 
      "community_name": selectCommunity,
      "message": newAnnouncement,
    })
    .then(response => {
      console.log("Announcement posting....");
      console.log(response.status);
      setError("");

      setAnnouncements([...announcements, response.data]); // Assuming response.data is the new announcement
      setNewAnnouncement('');
    })
    .catch(error => {
      console.error("Error posting announcement: ", error);
    });
  };

  useEffect(() => {
    let url = `http://localhost:8000/api/get_user_communities/?username=${encodeURIComponent(currentUser.username)}`;
    axios.get(url)
      .then(response => {
        setCommunities(response.data.communities);
        setError("");
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
    }, []);

  const handleNewAnnouncementChange = (e) => {
    setNewAnnouncement(e.target.value);
  };

  const handleCommunityChange = (event) => {
    setSelectCommunity(event.target.value);
};

  if (isLoading) return <p>Loading...</p>;


  return (
    <div className="annoucement-container">
      <div className='card-container'>
        {announcements && announcements.map((announcement) => (
          <AnnoucementCard
            key={announcement.id} 
            name={announcement.community}
            person={announcement.user}
            message={announcement.message}
            date={announcement.date}
            phone={""}
            mail={""}
          />
        ))}
      </div>
      <p className='annoucement-title'>Make Announcement to Community</p>
      <div className="annoucement-notes">
        <textarea 
          placeholder="Annoucement" 
          value={newAnnouncement}
          onChange={handleNewAnnouncementChange}
        ></textarea>
      </div>

      <select value={selectCommunity} onChange={handleCommunityChange}>
                <option value="">Select a Community</option>
                {communities && communities.map(community => (
                    <option key= {community.id} value={community.community_name}>
                      {community.community_name}
                    </option>
                  ))}
      </select>

      <button className="confirm-booking" onClick={postAnnouncement}>Confirm Announcement</button>

      <div> {error} </div>
    </div>
  );
};

export default withAuthProtection(AnnoucementDashboard);
