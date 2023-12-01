import React, { FC } from 'react';
import PropTypes from 'prop-types';
import './BookingCard.css';
import Link from 'next/link';

interface BookingCardProps {
  name: string;
  location: string;
  members: number;
  amenities: number;
  adminContact: string;
}

const BookingCard: FC<BookingCardProps> = ({
name,
  location,
  members,
  amenities,
  adminContact,
}) => (
    <div className = "card"> 
        <div className="text-wrapper">{name}</div>
        <p className="location">
        <span className="span">Location</span>
        <span className="text-wrapper-2">
            : {location}
            <br />
            <br />
        </span>
        <span className="span">Join Pass</span>
        <span className="text-wrapper-2">
            : {members}<br />
            <br />
        </span>
        <span className="span">Amenities</span>
        <span className="text-wrapper-2">
            : {amenities}<br />
            <br />
        </span>
        <span className="span">Admin Contact</span>
        <span className="text-wrapper-2">
            : {adminContact}
            <br />
        </span>
    </p>
    <div className="text-wrapper-3"> 
    <Link href='/createbooking'> Open community booking page </Link>
    </div>
    </div>
    

);

BookingCard.propTypes = {
  location: PropTypes.string.isRequired,
  members: PropTypes.number.isRequired,
  amenities: PropTypes.number.isRequired,
  adminContact: PropTypes.string.isRequired,
};

export default BookingCard;
