// import React, { FC } from 'react';
// import PropTypes from 'prop-types';
// import './BookingCard.css';
// import Link from 'next/link';
// import { useAuth } from '../Body/authentication/AuthContext';

// interface BookingCardProps {
//   name: string;
//   location: string;
//   members: number;
//   amenities: number;
//   adminContact: string;
// }

// const { user, setCommunityData } = useAuth();

// const saveCommunityState = () => {
//   setCommunityData(name);
// }
  


// const BookingCard: FC<BookingCardProps> = ({
// name,
//   location,
//   members,
//   amenities,
//   adminContact,
// }) => (
//     <div className = "card"> 
//         <div className="text-wrapper">{name}</div>
//         <p className="location">
//         <span className="span">Location</span>
//         <span className="text-wrapper-2">
//             : {location}
//             <br />
//             <br />
//         </span>
//         <span className="span">Join Pass</span>
//         <span className="text-wrapper-2">
//             : {members}<br />
//             <br />
//         </span>
//         <span className="span">Amenities</span>
//         <span className="text-wrapper-2">
//             : {amenities}<br />
//             <br />
//         </span>
//         <span className="span">Admin Contact</span>
//         <span className="text-wrapper-2">
//             : {adminContact}
//             <br />
//         </span>
//     </p>
//     <div className="text-wrapper-3"> 
//     <Link href='/createbooking' onClick={saveCommunityState}> Open community booking page </Link>
//     </div>
//     </div>
    

// );

// BookingCard.propTypes = {
//   location: PropTypes.string.isRequired,
//   members: PropTypes.number.isRequired,
//   amenities: PropTypes.number.isRequired,
//   adminContact: PropTypes.string.isRequired,
// };

// export default BookingCard;


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
      <div className="text-wrapper"><Link href='/createbooking' passHref onClick={saveCommunityState}>
          {name}
        </Link></div>
      <p className="location">
        <span className="span">Location</span>
        <span className="text-wrapper-2">: {location}</span>
        <br /><br />

        <span className="span">Join Pass</span>
        <span className="text-wrapper-2">: {members}</span>
        <br /><br />

        <span className="span">Amenities</span>
        <span className="text-wrapper-2">: {amenities}</span>
        <br /><br />

        <span className="span">Admin Contact</span>
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
