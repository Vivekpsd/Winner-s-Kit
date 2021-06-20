import React from 'react';

export default function card(props) {
  return (
    <div className='cc-holder'>
      <div className='card-container'>
        <img src={props.svg} alt='svg' />
        <h4>{props.title}</h4>
        <p>{props.tutor}</p>
        <p>{props.rating}</p>
      </div>
    </div>
  );
}
