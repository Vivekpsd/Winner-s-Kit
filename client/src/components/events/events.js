import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { allEvents } from '../../actions/event';
import { getCurrentProfile } from '../../actions/profile';
import EventItem from './EventItem';

import { FaArrowLeft } from 'react-icons/fa';
import EventBg from '../../img/EventBg.png';
import Event1Bg from '../../img/bgEvent1.png';
import './event.css';
import { FiAlertCircle } from 'react-icons/fi';
const Events = ({
  allEvents,
  event: { events, loading },
  getCurrentProfile,
  profile: { profile },
}) => {
  useEffect(() => {
    allEvents();
    getCurrentProfile();
  }, [allEvents, getCurrentProfile]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div
            style={{
              backgroundImage: `url(${EventBg})`,
              backgroundRepeat: 'no-repear',
              backgroundAttachment: 'fixed',
            }}
          >
            <div className='container pt-4'>
              <div className='row'>
                <div className='col-12'>
                  <h2 className='large'>Events</h2>
                  <p className='lead'>
                    <i className='fab fa-connectdevelop' /> Browse our Events
                  </p>

                  <div>
                    <p className=''></p>
                    {profile.user.role === 'admin' && (
                      <Link to='/createEvent' className='course-btn'>
                        Add Event
                      </Link>
                    )}
                    &nbsp;
                    <Link to='/dashboard' className='btn btn-dark'>
                      Go Back To Dashboard
                    </Link>
                  </div>

                  <br></br>
                  <div className='events row'>
                    {events.length > 0 ? (
                      events.map((event) => (
                        <div
                          className='card text-dark  col-12 mb-3 pt-2'
                          style={{
                            border: '2px solid black',
                            borderRadius: '10px',
                            backgroundImage: `url(${Event1Bg})`,
                          }}
                        >
                          <div className='card-body'>
                            <span className='card-text'>
                              <div className='container'>
                                <div className='row'>
                                  <div className='col-12'>
                                    <h4>
                                      <FiAlertCircle /> &nbsp; {event.title}
                                    </h4>
                                    <hr></hr>
                                    <p className='text-muted'>
                                      {event.description}
                                    </p>
                                  </div>
                                </div>
                                <div className='row'>
                                  <div className='col-9 ml-auto'>
                                    <b className='badge badge-danger'>
                                      Start Date -{' '}
                                    </b>
                                    &nbsp;
                                    {event.startDate}
                                    <br></br>
                                    <b className='badge badge-dark'>
                                      End Date -{' '}
                                    </b>
                                    &nbsp;&nbsp;
                                    {event.endDate}
                                    <br></br>
                                    <br></br>
                                  </div>
                                  <div className='col-3 mr-auto'>
                                    <Link
                                      to={`/event/${event._id}`}
                                      className='login-button'
                                    >
                                      View Event
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <h4>No events found...</h4>
                    )}
                    {/* {events.length > 0 ? (
                    events.map((event) => (
                      <EventItem key={event._id} event={event} />
                    ))
                  ) : (
                    <h4>No courses found...</h4>
                  )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
    // <div>
    //   <h1>Events</h1>
    //   <Link to='/createEvent' className='btn btn-primary'>
    //     Create Event
    //   </Link>
    // </div>
  );
};

Events.propTypes = {
  event: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  event: state.event,
});

export default connect(mapStateToProps, { allEvents, getCurrentProfile })(
  Events
);
