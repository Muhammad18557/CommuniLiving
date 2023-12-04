
import React, { FC } from 'react';
import Link from 'next/link';
import { useAuth } from '../Body/authentication/AuthContext';
import './BookingCard.css';

// Define the TypeScript interface for the component props
interface BookingCardProps {
  name: string;
  location: string;
  members: number;
  amenities: number;
  adminContact: string;
}

// Define the BookingCard functional component with its props
const BookingCard: FC<BookingCardProps> = ({
  name,
  location,
  members,
  amenities,
  adminContact,
}) => {
  // Use the `useAuth` hook inside the component to access the context data and setter function
  const { setCommunityData } = useAuth();
  
  // Define a function that will use the `setCommunityData` function from the context
  const saveCommunityState = () => {
    setCommunityData(name);
  }

  // Return the JSX for the component
  return (
    <div className="card"> 
      <div className="text-wrapper" onClick={saveCommunityState} ><Link href='/createbooking' passHref>
          {name}
        </Link></div>
      <p className="location">
        <span className="span">Location</span>
        <span className="text-wrapper-2">: {location}</span>
        <br /><br />

        <span className="span">Join Pass</span>
        <span className="text-wrapper-2">: {members}</span>
        <br /><br />

        {
  amenities === "" 
  ? <div>
      <span className="span">Amenities</span>
      <span className="text-wrapper-2">: No amenities for this community yet</span>
    </div>
  : <div>
      <span className="span">Amenities</span>
      <span className="text-wrapper-2">: {amenities}</span>
    </div>
}
<br /><br />

        <span className="span">Description</span>
        <span className="text-wrapper-2">: {adminContact}</span>
        <br />
      </p>
      <div className="text-wrapper-3"> 
        {/* Use the Link component from Next.js for client-side transitions between routes */}
        <Link href='/createbooking' passHref onClick={saveCommunityState}>
          {/* Use an anchor tag inside the Link and attach the click handler */}
          Open community booking page
        </Link>
      </div>
    </div>
  );
};

// Export the component as the default export
export default BookingCard;
