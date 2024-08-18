import React from 'react';
import { Inputs } from '../pages/react-hook';
import './componentStyle.css';

interface CardProps {
  el: Inputs;
  isLast: boolean;
}

const Card: React.FC<CardProps> = ({ el, isLast }) => {
  return (
    <div className={`card ${isLast ? 'card-last' : ''}`}>
      <div className="card-image">
        <img src={el.picture} alt="picture" />
      </div>
      <div className="card-content">
        <p>
          <strong>Age:</strong> <span>{el.age}</span>
        </p>
        <p>
          <strong>Email:</strong> <span>{el.email}</span>
        </p>
        <p>
          <strong>Password:</strong> <span>{el.password}</span>
        </p>
        <p>
          <strong>Gender:</strong> <span>{el.gender}</span>
        </p>
        <p>
          <strong>Country:</strong> <span>{el.country}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
