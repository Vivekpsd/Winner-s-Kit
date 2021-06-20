import React from 'react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import '../dashboard/dashboardCSS/dashboard.css';

const DashboardStudent = () => {
  return (
    <Fragment>
      <ul className='navbar-nav ml-auto'>
        <li className='nav-item'>
          <Link to='/' className='nav-link' style={{ textDecoration: 'none' }}>
            <i className='text-primary' /> Dashboard
          </Link>
        </li>
        &nbsp;&nbsp;&nbsp;
        <li className='nav-item'>
          <Link
            to='/student-courses'
            className='nav-link'
            style={{ textDecoration: 'none' }}
          >
            <i className=' text-primary' /> Courses
          </Link>
        </li>
        &nbsp;&nbsp;&nbsp;
        <li className='nav-item'>
          <Link
            to='/assignments-tosubmit'
            className='nav-link'
            style={{ textDecoration: 'none' }}
          >
            <i className='text-primary' /> Assigment
          </Link>
        </li>
        &nbsp;&nbsp;&nbsp;
        <li className='nav-item'>
          <Link
            to='/message'
            className='nav-link'
            style={{ textDecoration: 'none' }}
          >
            <i className='text-primary' /> Message
          </Link>
        </li>
        &nbsp;&nbsp;&nbsp;
        <li className='nav-item'>
          <Link
            to='/student-events'
            className='nav-link'
            style={{ textDecoration: 'none' }}
          >
            <i className=' text-primary' /> View Events
          </Link>
        </li>
      </ul>
    </Fragment>
  );
};

export default DashboardStudent;
