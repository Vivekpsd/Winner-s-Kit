import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const DashboardTeacher = () => {
  return (
    <Fragment>
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link to='/' className='nav-link' style={{ textDecoration: 'none' }}>
            <i className='text-primary' /> Dashboard
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/message'
            className='nav-link'
            style={{ textDecoration: 'none' }}
          >
            <i className='text-primary' /> Message
          </Link>
        </li>

        <li className='nav-item'>
          <Link
            to='/teacher-courses'
            className='nav-link'
            style={{ textDecoration: 'none' }}
          >
            <i className=' text-primary' /> My Courses
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/assigment'
            className='nav-link'
            style={{ textDecoration: 'none' }}
          >
            <i className='text-primary' /> Assigment
          </Link>
        </li>
        <li className='nav-item'>
          <Link
            to='/events'
            className='nav-link'
            style={{ textDecoration: 'none' }}
          >
            <i className=' text-primary' /> Events
          </Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default DashboardTeacher;
