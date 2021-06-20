import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import { getCourses } from '../../actions/course';
import { getAssignmentCourse } from '../../actions/assignment';
import Spinner from '../layouts/Spinner';

const ViewAssignmentsTeacher = ({
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
          <div className='container pt-5'>
            <div className='row'>
              <div className='col'>
                <h3>Subjects of Asignment Uploaded By You</h3>
                <hr></hr>
                <table class='table '>
                  <thead class='thead-dark'>
                    <tr>
                      <th scope='col'>Subjects</th>
                      <th scope='col'>View Assignments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignment.courses.map((courseID) =>
                      courses.map((allCourseID) => {
                        return (
                          <Fragment>
                            {courseID === allCourseID._id && (
                              <tr>
                                <td>{allCourseID.title} </td>
                                <td>
                                  <Link
                                    to={`/assignment/${allCourseID._id}`}
                                    className='btn btn-outline-dark'
                                  >
                                    View Uploaded Assignments
                                  </Link>
                                </td>
                              </tr>
                            )}
                          </Fragment>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div style={{ height: '250px' }}></div>
        </Fragment>
      )}
    </Fragment>
  );
};

ViewAssignmentsTeacher.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getAssignmentCourse: PropTypes.object.isRequired,
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
})(ViewAssignmentsTeacher);
