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

export const AnnoucementDashboard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [newAnnouncement, setNewAnnouncement] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // const { currentUser } = useAuth();

  const currentUser = { username: 'admin' }; // Default to 'test' if no user is logged in

  useEffect(() => {
    setIsLoading(true);
    // Construct the URL with a query parameter for the username
    const url = `http://localhost:8000/api/message/?username=${encodeURIComponent(currentUser.username)}`;

    axios.get(url) // Use the URL with the query parameter
      .then(response => {
        console.log(response.data.messages);
        setAnnouncements(response.data.messages); // Assuming the response data is the array of announcements
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(error);
      })
      .finally(() => setIsLoading(false));
  }, [currentUser.username]);


  const postAnnouncement = () => {
    axios.post("http://localhost:8000/api/message/", {
      "username": currentUser.username, 
      "community_name": "G14",
      "message": newAnnouncement,
    })
    .then(response => {
      console.log(response);
      setAnnouncements([...announcements, response.data]); // Assuming response.data is the new announcement
      setNewAnnouncement(''); // Clear the textarea
    })
    .catch(error => {
      console.error("Error posting announcement: ", error);
    });
  };

  const handleNewAnnouncementChange = (e) => {
    setNewAnnouncement(e.target.value);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading announcements!</p>;

  return (
    <div className="annoucement-container">
      <div className='card-container'>
        {announcements.map((announcement) => (
          <AnnoucementCard
            key={announcement.id} // Assuming each announcement has a unique 'id'
            name=""
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
      <button className="confirm-booking" onClick={postAnnouncement}>Confirm Announcement</button>
    </div>
  );
};

export default AnnoucementDashboard;
