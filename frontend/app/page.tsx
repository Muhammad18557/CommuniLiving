"use client";
import React from "react";
import "./Home.css";


function Home() {
  return (
    <div className="home-page">
      <div className="div">
        <div className="right-panel">
          <p className="page-info">
            <span className="text-wrapper">
              CommuniLiving <br />
            </span>
            <span className="span">
              Enhancing communal living
              <br />
            </span>
            <span className="text-wrapper-2">
              <br />
            </span>
            <span className="text-wrapper">
              Efficient resource management
              <br />
            </span>
            <span className="span">
              Use our real-time booking system to reserve shared spaces and amenities
              <br />
              <br />
            </span>
            <span className="text-wrapper">
              Communication &amp; Community
              <br />
            </span>
            <span className="span">Built-in messaging features to facilitate event planning and space bookings</span>
          </p>
          <img
            className="logo-image"
            src="https://communitylivinginc.org/wp-content/uploads/2016/05/CLI-Logo-cropped.png"
            alt="Your Company"
          />
        </div>
        <div className="left-panel" />
        <div className="bottom-panel">
          <div className="slogan">Simply, together. Together, simply.</div>
        </div>
       
      </div>
    </div>
  );
};

export default Home;
