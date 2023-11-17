import React, { FC } from 'react';
import PropTypes from 'prop-types';
import './AnnoucementCard.css';

interface AnnoucementCardProps {
  name: string;
  person: string;
  message: string;
  phone: string;
  mail: string;
  date: string;
}

const AnnoucementCard: FC<AnnoucementCardProps> = ({
name,
  person,
  message,
  phone,
  mail,
  date
}) => (
    (
        <div className="label">
          <p className="card">
            <span className="text-wrapper">
              {name} | {person}
              <br />
            </span>
            <span className="span">
              {message}
              <br />
              <br />
             {phone} | {mail} | {date}
            </span>
          </p>
        </div>
      )

);

AnnoucementCard.propTypes = {
  name : PropTypes.string.isRequired,
  person: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  mail: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};

export default AnnoucementCard;
