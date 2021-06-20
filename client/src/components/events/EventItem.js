import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfilePic from '../layouts/ProfilePic';

const EventItem = ({
  event: { _id, title, description, startDate, endDate, link },
}) => {
  return (
    <div className='card text-dark bg-light mb-3 shadow p-3 mb-5 bg-white rounded'>
      <div className='card-body'>
        <span className='card-text'>
          <div className='container'>
            <div className='row'>
              <div className='col-2 mr-5'>
                <ProfilePic />
              </div>
              <div className='col-4'>
                <h3>{title}</h3>
                <hr></hr>
                <p className='text-muted'>{description}</p>
              </div>
              <div className='col-4 ml-auto'>
                <b>Start Date - </b>
                {startDate}
                <br></br>
                <b>End Date - </b>
                {endDate}
                <br></br>

                <br></br>
                <Link to={`/event/${_id}`} className='btn btn-info'>
                  View Event
                </Link>
              </div>
            </div>
          </div>
          <div>
            <p className='my-1'></p>
          </div>
        </span>
      </div>
    </div>
  );
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};

export default EventItem;
