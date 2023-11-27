import React from "react";
import "./Help.css";

export const Help = () => {
  return (
    <div className="help-container">
      <h1>Contact Us</h1>
      <br></br>
      <p>Let’s get this conversation started. Tell us a bit about yourself, and how we can help. We’ll then get in touch with you as soon as we can</p>
      <div className="name">
        <p className='option-label'>First Name</p>
        <p className='option-label'> Last Name</p>
      </div>
      
      <div className='first-last'>
          <input type="text" className="first-name"/>
          <input type="text" className="last-name"/>
      </div>
      <div className="name">
      <p className='option-label'>Contact Email</p>
      </div>
      <div className='contact-email'>
        <input type="text" className="email"/>
      </div>
      <div className="name">
      <p className='option-label'>Message</p>
      </div>
      <div className="message">
        <textarea placeholder="Your Message Here..."></textarea>
      </div>
      <button className="submit">Send</button>
    </div>
  );
};

export default Help
