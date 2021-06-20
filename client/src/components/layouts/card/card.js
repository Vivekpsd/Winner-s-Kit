import React from 'react';
import image from './1.jpg';
import './card.css';

const card = (props) => {
  return (
    <div className='card-holder'>
      <div className='cource-card'>
        <img src={image} alt='thumbnail' />
        <h6>{props.title}</h6>
        <p>{props.instructor}</p>
        <h6>{props.price}</h6>
      </div>
    </div>
  );
};

export default card;
