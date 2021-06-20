import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import { getCourses } from '../../actions/course';
import {
  getAssignmentCourse,
  getUploadedAssignment,
} from '../../actions/assignment';
import Spinner from '../layouts/Spinner';

const ViewUploadedAssignments = ({
  match,
  getCourses,
  course: { courses, loading },
  getCurrentProfile,
  profile: { profile },
  getAssignmentCourse,
  getUploadedAssignment,
  assignment,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCourses();
    getAssignmentCourse();
    getUploadedAssignment(match.params.id);
  }, [
    getCurrentProfile,
    getCourses,
    getAssignmentCourse,
    getUploadedAssignment,
  ]);

  return (
    <Fragment>
      {loading && assignment.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container pt-5 '>
            <div className='row'>
              <div className='col'>
                <h3>List of Assignments </h3>
                <hr></hr>
                <table class='table '>
                  <thead class='thead-dark'>
                    <tr>
                      <th scope='col'>Uploaded Assignments</th>
                      <th scope='col'>Submitted Assignments</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignment.assignments.map((course) => {
                      return (
                        <tr>
                          <td>{course}</td>
                          <td>
                            <Link
                              to={`/assignment-submitted/${match.params.id}/${course}`}
                              style={{
                                textDecoration: 'none',
                                color: 'black',
                                backgroundColor: 'yellow',
                                border: '1px solid black',
                                padding: '4px',
                              }}
                            >
                              View Submitted Assignment
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
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

ViewUploadedAssignments.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getAssignmentCourse: PropTypes.object.isRequired,
  getUploadedAssignment: PropTypes.object.isRequired,
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
  getUploadedAssignment,
})(ViewUploadedAssignments);
