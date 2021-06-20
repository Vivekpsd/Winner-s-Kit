import React, { Fragment, useEffect, useState } from 'react';
import { getCourses } from '../../actions/course';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { uploadAssignment } from '../../actions/course';
import { getCourseById } from '../../actions/course';
import course from '../../reducers/course';
import { uploadAssignmentStudent } from '../../actions/assignment';
import Spinner from '../layouts/Spinner';

const UploadAssignmentForm = ({
  match,
  getCourses,
  getCourseById,
  getCurrentProfile,
  course: { course, loading },
  profile: { profile },
  uploadAssignmentStudent,
}) => {
  useEffect(() => {
    getCourseById(match.params.id);
    getCourses();
    getCurrentProfile();
  }, [getCourses, getCurrentProfile, getCourseById]);

  //const [formData, setFormData] = useState('');
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [formdetails, setformdetails] = useState({
    title: '',
    endDate: '',
    description: '',
  });

  const { title, description, endDate } = formdetails;
  const onChange3 = (e) =>
    setformdetails({ ...formdetails, [e.target.name]: e.target.value });
  //const [uploadedFile, setUploadedFile] = useState({});
  //const [message, setMessage] = useState('');
  //const [uploadPercentage, setUploadPercentage] = useState(0);
  const [courseID, setCourse] = useState('');
  // const { title, description, endDate } = formData;

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };
  const onChange2 = (e) => {
    setCourse(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    uploadAssignmentStudent(
      formData,
      profile.user.name,
      profile.user.email,
      match.params.id,
      match.params.name
    );
  };
  const getTodayDate = (endDate) => {
    var d1 = new Date();
    var d2 = new Date(endDate);

    if (d1 > d2) {
      return false;
    } else if (d1 <= d2) {
      return true;
    }
  };

  return (
    <Fragment>
      {course === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container' style={{ marginTop: '110px' }}>
            <h3>Upload Your Assignment Here</h3>
            <hr></hr>
            {course.assignment.map((assignment) => {
              return (
                <div>
                  {assignment.title + '.pdf' === match.params.name &&
                    getTodayDate(assignment.endDate) && (
                      <Fragment>
                        <div className='alert alert-info'>
                          <strong>{assignment.endDate}</strong> is the last day
                          to submit this assignment.
                        </div>
                        <form onSubmit={onSubmit}>
                          <div className='custom-file mb-4'>
                            <input
                              type='file'
                              className='custom-file-input'
                              id='customFile'
                              onChange={onChange}
                              accept='application/pdf'
                            />
                            <small className='text-muted'>
                              Upload Only PDF Files
                            </small>
                            <label
                              className='custom-file-label'
                              htmlFor='customFile'
                            >
                              {filename}
                            </label>
                          </div>

                          <input
                            type='submit'
                            value='Upload'
                            className='btn btn-primary btn-block mt-4'
                          />
                        </form>
                      </Fragment>
                    )}
                </div>
              );
            })}
            {course.assignment.map((assignment) => {
              return (
                <div>
                  {assignment.title + '.pdf' === match.params.name &&
                    !getTodayDate(assignment.endDate) && (
                      <div>
                        <div className='alert alert-danger'>
                          Assignment Due Date Over!
                        </div>
                        <form onSubmit={onSubmit}>
                          <div className='custom-file mb-4'>
                            <input
                              type='file'
                              className='custom-file-input'
                              id='customFile'
                              onChange={onChange}
                            />
                            <label
                              className='custom-file-label'
                              htmlFor='customFile'
                            >
                              {filename}
                            </label>
                          </div>

                          <input
                            type='submit'
                            value='Upload'
                            className='btn btn-primary btn-block mt-4'
                            disabled
                          />
                        </form>
                      </div>
                    )}
                </div>
              );
            })}
          </div>
          <div style={{ height: '200px' }}></div>
        </Fragment>
      )}
      {/* <div className='container'>
        {!loading &&
          course.assignment.map((assignment) => {
            return (
              <p>
                {' '}
                {assignment.title === match.params.name &&
                  getTodayDate(assignment.endDate) && (
                    <form onSubmit={onSubmit}>
                      <div className='custom-file mb-4'>
                        <input
                          type='file'
                          className='custom-file-input'
                          id='customFile'
                          onChange={onChange}
                        />
                        <label
                          className='custom-file-label'
                          htmlFor='customFile'
                        >
                          {filename}
                        </label>
                      </div>

                      <input
                        type='submit'
                        value='Upload'
                        className='btn btn-primary btn-block mt-4'
                      />
                    </form>
                  )}
              </p>
            );
          })}

        {!loading &&
          course.assignment.map((assignment) => {
            return (
              <div>
                {' '}
                {assignment.title === match.params.name &&
                  !getTodayDate(assignment.endDate) && (
                    <div>
                      <div className='alert alert-danger'>
                        Assignment Due Date Over!
                      </div>
                      <form onSubmit={onSubmit}>
                        <div className='custom-file mb-4'>
                          <input
                            type='file'
                            className='custom-file-input'
                            id='customFile'
                            onChange={onChange}
                          />
                          <label
                            className='custom-file-label'
                            htmlFor='customFile'
                          >
                            {filename}
                          </label>
                        </div>

                        <input
                          type='submit'
                          value='Upload'
                          className='btn btn-primary btn-block mt-4'
                          disabled
                        />
                      </form>
                    </div>
                  )}
              </div>
            );
          })}
      </div> */}
    </Fragment>
  );
};
UploadAssignmentForm.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  uploadAssignment: PropTypes.func.isRequired,
  getCourseById: PropTypes.func.isRequired,
  uploadAssignmentStudent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  profile: state.profile,
});

export default connect(mapStateToProps, {
  getCourses,
  getCurrentProfile,
  uploadAssignment,
  getCourseById,
  uploadAssignmentStudent,
})(UploadAssignmentForm);
