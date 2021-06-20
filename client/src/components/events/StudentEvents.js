import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import { getCourses } from '../../actions/course';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { allEvents } from '../../actions/event';
import ProfilePic from '../layouts/ProfilePic';
import { FaArrowLeft } from 'react-icons/fa';
import EventBg from '../../img/EventBg.png';
import Event1Bg from '../../img/bgEvent1.png';
import './event.css';
import { FiAlertCircle } from 'react-icons/fi';

const StudentEvents = ({
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
          {
            <div
              style={{
                backgroundImage: `url(${EventBg})`,
                backgroundRepeat: 'no-repear',
                backgroundAttachment: 'fixed',
              }}
            >
              <div
                className='container'
                style={{
                  marginTop: '80px',
                  paddingTop: '20px',
                }}
              >
                <div className='row'>
                  <div className='col-12'>
                    <div>
                      <h2 className='large '>Events</h2>
                      <p className='lead'>
                        <i className='fab fa-connectdevelop ' /> Browse and
                        Register for upcoming Events
                      </p>

                      <div>
                        <Link to='/dashboard' className='btn btn-dark'>
                          <FaArrowLeft />
                          &nbsp;Dashboard
                        </Link>
                      </div>
                    </div>

                    <br></br>
                    <div className='profiles row'>
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
                                      <a
                                        href={event.link}
                                        target='blank'
                                        className='login-button'
                                      >
                                        Register Here
                                      </a>
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
                    </div>
                  </div>
                </div>
                <br></br>
                <br></br>
              </div>
            </div>
          }
        </Fragment>
      )}
    </Fragment>
  );
};

StudentEvents.propTypes = {
  allEvents: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  event: state.event,
  profile: state.profile,
});

export default connect(mapStateToProps, { allEvents, getCurrentProfile })(
  StudentEvents
);
