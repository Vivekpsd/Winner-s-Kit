import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createCourse, getCourseById } from '../../actions/course';
import { getProfiles } from '../../actions/profile';
import DashboardActions from '../dashboard/DashboardAction';

const EditCourse = ({
  course: { course, loading },
  createCourse,
  getCourseById,
  history,
  getProfiles,
  profile: { profiles },
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
    courseID: null,
    price: '',
  });

  useEffect(() => {
    getCourseById(course._id);
    setFormData({
      title: loading || !course.title ? '' : course.title,
      description: loading || !course.description ? '' : course.description,
      content: loading || !course.content ? '' : course.content,
      teacher: loading || !course.teacher ? '' : course.teacher,
      startDate: loading || !course.startDate ? '' : course.startDate,
      endDate: loading || !course.endDate ? '' : course.endDate,
      prerequisite: loading || !course.prerequisite ? '' : course.prerequisite,
      price: loading || !course.price ? '' : course.price,
      courseID: course._id,
    });
  }, [loading]);

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
    createCourse(formData, history, userID, true);
  };

  return (
    <Fragment>
      <div className='container pt-5 pb-5'>
        <div className='row'>
          <div className='col-12'>
            <h2 className='large text-dark'>Edit Course</h2>
            <p className='lead'>
              <i className='fas fa-user' /> Edit Course here
            </p>
            <hr></hr>
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
              <div className='form-group'>
                <label htmlFor='price'>Course Price</label>
                <input
                  id='price'
                  className='form-control'
                  type='number'
                  placeholder='Price'
                  name='price'
                  value={price}
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
                  //value={teacher}
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

EditCourse.propTypes = {
  createCourse: PropTypes.func.isRequired,
  getCourseById: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  createCourse,
  getCourseById,
  getProfiles,
})(withRouter(EditCourse));
