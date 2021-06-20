import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCourse } from '../../actions/course';
import { getProfiles } from '../../actions/profile';
import { enrollTeacher } from '../../actions/profile';
import DashboardActions from '../dashboard/DashboardAction';

const CreateCourse = ({
  createCourse,
  getProfiles,
  profile: { profiles },
  history,
}) => {
  useEffect(() => {
    getProfiles();
  }, [getProfiles]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    teacher: '',
    startDate: '',
    endDate: '',
    prerequisite: '',
    price: '',
    courseID: null,
  });
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');

  const {
    title,
    description,
    content,
    teacher,
    startDate,
    endDate,
    prerequisite,
    price,
  } = formData;
  const onChange3 = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const [userID, setUserID] = useState(0);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onChange2 = (e) => {
    profiles.map((profile) => {
      if (profile.user._id === e.target.value) {
        setFormData({ ...formData, [e.target.name]: profile.user.name });
        setUserID(profile._id);
      }
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('Up - ' + userID);
    const formData2 = new FormData();
    formData2.append('file', file);
    createCourse(formData, filename, formData2, history, userID);
  };

  return (
    <Fragment>
      <div className='container pt-5 pb-5'>
        <div className='row'>
          <div className='col-12'>
            <h2 className='large text-dark'>Create New Course</h2>
            <p className='lead'>
              <i className='fas fa-user' /> Create your course here
            </p>
            <form className='form' onSubmit={onSubmit}>
              <div className='form-group'>
                <label htmlFor='title'>Course Title</label>
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
                  placeholder='A breif intro of the course'
                  id='description'
                  className='form-control'
                  name='description'
                  value={description}
                  onChange={onChange}
                />
                <small className='form-text text-muted'>
                  Description of Project
                </small>
              </div>
              <div className='form-group'>
                <label htmlFor='content'>Course Content</label>
                <input
                  id='content'
                  className='form-control'
                  type='text'
                  placeholder='content'
                  name='content'
                  value={content}
                  onChange={onChange}
                />
              </div>

              <div className='form-group col-md-4'>
                <label htmlFor='typeMsg'>Choose Teacher</label>
                <select
                  id='teacher'
                  className='form-control'
                  name='teacher'
                  onChange={(e) => onChange2(e)}
                >
                  {profiles.length > 0 ? (
                    profiles.map(
                      (profile) =>
                        profile.user.role === 'teacher' && (
                          <option value={profile.user._id} key={profile._id}>
                            {profile.user.name}
                          </option>
                        )
                    )
                  ) : (
                    <option></option>
                  )}
                </select>
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
                <label htmlFor='price'>Price</label>
                <input
                  id='price'
                  type='number'
                  className='form-control'
                  name='price'
                  value={price}
                  onChange={onChange}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='prerequisite'>Prerequisite</label>
                <input
                  placeholder='A breif intro of the course'
                  id='prerequisite'
                  className='form-control'
                  name='prerequisite'
                  value={prerequisite}
                  onChange={onChange}
                />
                <small className='form-text text-muted'>
                  Things student should know before appling for this course
                </small>
              </div>
              <div className='custom-file mb-4'>
                <input
                  type='file'
                  className='img'
                  id='img'
                  onChange={onChange3}
                  //accept='application/pdf'
                />
                <small className='text-muted'>Upload Course Image</small>
                <label className='custom-file-label' htmlFor='img'>
                  {filename}
                </label>
              </div>

              <input type='submit' className='btn btn-primary my-1 mr-2' />
              <Link className='btn btn-light my-1' to='/courses'>
                Go Back
              </Link>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

CreateCourse.propTypes = {
  createCourse: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createCourse, getProfiles })(
  withRouter(CreateCourse)
);
