import React from "react";
import AnnoucementCard from '../components/AnnoucementCard/AnnoucementCard';
import "./annoucementDashboard.css";
import announcementData from './annoucementData.json';

export const AnnoucementDashboard = () => {

  return (
    <div className="annoucement-container">
      <div className="annoucement-dashboard-page">
        <div className="div">
          <div className="page-intro">
            <div className="page-title"><h1>Announcements</h1></div>
          </div>
        </div>
        <br></br>
        <div className='card-container'>
          {announcementData.map((annoucement) => (
            <AnnoucementCard
              key={annoucement.id}
              name={annoucement.name}
              person={annoucement.person}
              message={annoucement.message}
              phone={annoucement.phone}
              mail={annoucement.mail}
              date={annoucement.date}
            />
          ))}
        </div>
        <p className='annoucement-title'>Make Announcement to Community</p>
        <div className="annoucement-notes">
          <textarea placeholder="Annoucement"></textarea>
        </div>
        <button className="confirm-booking">Confirm Annoucement</button>
      </div>
    </div>
    

  );
};

export default AnnoucementDashboard;