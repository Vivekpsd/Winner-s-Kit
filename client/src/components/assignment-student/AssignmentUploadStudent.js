import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import { getCourses } from '../../actions/course';
import { getAssignmentCourse } from '../../actions/assignment';
import Spinner from '../layouts/Spinner';
import NotAvailable from '../../img/notAvailable.webp';
import { FaArrowRight } from 'react-icons/fa';

const AssignmentUploadStudent = ({
  getCourses,
  course: { courses, loading },
  getCurrentProfile,
  profile: { profile },
  getAssignmentCourse,
  assignment,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCourses();
    getAssignmentCourse();
  }, [getCurrentProfile, getCourses, getAssignmentCourse]);

  return (
    <Fragment>
      {loading && assignment.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container' style={{ marginTop: '110px' }}>
            <div className='row'>
              <div className='col'>
                {profile === null ? (
                  <div>
                    <h1 className='text-center'>
                      No Assignment Available
                      <img src={NotAvailable} alt='not available' />
                    </h1>
                  </div>
                ) : (
                  <div>
                    <h3>Subjects For Assignments -</h3>
                    <hr></hr>
                    <table className='table'>
                      <thead className='thead-dark'>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Subject Assignment </th>
                          <th scope='col'>Taught By</th>
                          <th scope='col'>Assignments</th>
                        </tr>
                      </thead>
                      {assignment.courses.map((courseID) =>
                        courses.map((course) => {
                          return (
                            <Fragment>
                              {course._id === courseID &&
                                course.enrolledStudent.map((profileID) => {
                                  return (
                                    <tbody>
                                      {profileID === profile.user._id && (
                                        <tr>
                                          <th scope='row'>
                                            <FaArrowRight />
                                          </th>
                                          <td>
                                            <Link
                                              to={`assignment-tosubmit/${courseID}`}
                                              className='btn btn-outline-dark'
                                            >
                                              {course.title}
                                            </Link>
                                          </td>
                                          <td>{course.teacher}</td>
                                          <td>{course.assignment.length}</td>
                                        </tr>
                                      )}
                                    </tbody>
                                  );
                                })}
                            </Fragment>
                          );
                        })
                      )}
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div style={{ height: '200px' }}></div>
        </Fragment>
      )}
    </Fragment>
  );
};

AssignmentUploadStudent.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getAssignmentCourse: PropTypes.func.isRequired,
};
const mapSatateToProps = (state) => ({
  course: state.course,
  profile: state.profile,
  assignment: state.assignment,
});

export default connect(mapSatateToProps, {
  getCourses,
  getCurrentProfile,
  getAssignmentCourse,
})(AssignmentUploadStudent);
