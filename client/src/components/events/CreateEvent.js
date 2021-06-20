import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createEvent } from '../../actions/event';
import { getProfiles } from '../../actions/profile';
import DashboardActions from '../dashboard/DashboardAction';

const CreateEvent = ({
  createEvent,
  getProfiles,
  profile: { profiles },
  history,
}) => {
  useEffect(() => {
    createEvent();
  }, [createEvent]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    link: '',
  });

  const { title, description, startDate, endDate, link } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createEvent(formData, history);
  };

  return (
    <Fragment>
      <div className='container pt-5 pb-5'>
        <div className='row'>
          <div className='col-12'>
            <h2 className='large text-primary'>Create New Event</h2>
            <p className='lead'>
              <i className='fas fa-user' /> Create your event here
            </p>
            <form className='form' onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor='title'>Event Name</label>
                <input
                  id='title'
                  className='form-control'
                  type='text'
                  placeholder='Title'
                  name='title'
                  value={title}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='descirption'>Description</label>
                <textarea
                  placeholder='A breif intro of the event'
                  id='description'
                  className='form-control'
                  name='description'
                  value={description}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='bio'>Start Date</label>
                <input
                  id='startDate'
                  type='date'
                  className='form-control'
                  name='startDate'
                  value={startDate}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='endDate'>End Date</label>
                <input
                  id='endDate'
                  type='date'
                  className='form-control'
                  name='endDate'
                  value={endDate}
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='link'>Link</label>
                <input
                  id='link'
                  className='form-control'
                  type='text'
                  placeholder='Link'
                  name='link'
                  value={link}
                  onChange={onChange}
                />
              </div>

              <input type='submit' className='btn btn-primary my-1 mr-2' />
              <Link className='btn btn-light my-1' to='/events'>
                Go Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CreateEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createEvent, getProfiles })(
  withRouter(CreateEvent)
);
