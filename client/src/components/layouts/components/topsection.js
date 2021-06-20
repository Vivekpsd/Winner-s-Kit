import React from 'react';
import './components.css';
import { Link } from 'react-router-dom';
// import Svg from '../assets/undraw_teaching_f1cm.svg';

const topSection = (props) => {
  return (
    <div>
      <div className='topbox'>
        <img src={props.headimage} alt='svg' />

        <div className='tbcontent'>
          <h2 id='lft'>{props.head}</h2>
          <p id='lft'>{props.description}</p>
          <Link to='/login'>
            <button id='lft' className='circleScaleBtn'>
              <span>Get started</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default topSection;
