import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { Link, withRouter } from 'react-router-dom';
import { getEventById } from '../../actions/event';
import { deleteEvent } from '../../actions/event';
import ProfilePic from '../layouts/ProfilePic';
import DashboardActions from '../dashboard/DashboardAction';

const AdminEvent = ({
  match,
  getEventById,
  event: { event, loading },
  deleteEvent,
  history,
}) => {
  useEffect(() => {
    getEventById(match.params.id);
  }, [getEventById]);
  return (
    <Fragment>
      {event === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container'>
            <div className='row'>
              <div className='col-12'>
                <div className='card text-dark bg-light mb-3 shadow p-3 mb-5 bg-white rounded'>
                  <div className='card-body'>
                    <span className='card-text'>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-8'>
                            <Link to='/events' className='text-info'>
                              Back To All Event
                            </Link>
                            {event.title && (
                              <p className='display-4'>{event.title} </p>
                            )}
                            <hr></hr>
                            <p style={{ fontSize: '17px' }}>
                              {event.description}
                            </p>
                          </div>
                          <div className='col-4 align-self-center'>
                            <ProfilePic />
                          </div>
                        </div>
                        <hr></hr>

                        <div className='row mt-5'>
                          <div className='col'>
                            &nbsp;
                            <button
                              onClick={() => deleteEvent(event._id, history)}
                              className='btn btn-danger'
                            >
                              Delete Event
                            </button>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Event.propTypes = {
  getEventById: PropTypes.func.isRequired,
  Event: PropTypes.object.isRequired,
  deleteEvent: PropTypes.func.isRequired,
};
const mapSatateToProps = (state) => ({
  event: state.event,
});

export default connect(mapSatateToProps, {
  getEventById,
  deleteEvent,
})(withRouter(AdminEvent));
