import React, { Fragment } from 'react';

const featuredCource = (props) => {
  return (
    <div className='fc-holder'>
      <h4>Featured Cource</h4>

      <div className='featuredcource'>
        <h6>{props.title}</h6>
        <p>{props.description}</p>
        <h6 id='fc-explore'>{props.explore}</h6>
      </div>
    </div>
  );
};

export default featuredCource;
