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
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';

const AssignmentFileStudent = ({
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

  const download = async (course) => {
    axios({
      url: `/api/assignment/student/download-assignment/${match.params.id}/${course}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = link;

      link.setAttribute('download', course);
      document.body.appendChild(link);

      link.click();
    });
  };

  return (
    <Fragment>
      {loading && assignment.loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div
            className='container'
            style={{ marginTop: '110px', marginBottom: '200px' }}
          >
            <div className='row'>
              <div className='col'>
                <h3>List of Assignments </h3>
                <hr></hr>
                <table class='table '>
                  <thead class='thead-dark'>
                    <tr>
                      <th scope='col'>#</th>
                      <th scope='col'>Assignment Title</th>
                      <th scope='col'>Download</th>
                      <th scope='col'>Upload</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignment.assignments.map((course) => {
                      return (
                        <Fragment>
                          <tr>
                            <th>
                              <FaArrowRight />
                            </th>
                            <td>{course}</td>
                            <td>
                              <Link
                                to={`/upload-assignment-student/${match.params.id}/${course}`}
                                className='btn btn-outline-success'
                              >
                                Upload Assignment
                              </Link>
                            </td>
                            <td>
                              <Link
                                style={{
                                  textDecoration: 'none',
                                  color: 'black',
                                  backgroundColor: 'yellow',
                                  border: '1px solid black',
                                  padding: '4px',
                                }}
                                onClick={() => {
                                  download(course);
                                }}
                              >
                                Download
                              </Link>
                            </td>
                          </tr>
                        </Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
        </Fragment>
      )}
    </Fragment>
  );
};

AssignmentFileStudent.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getAssignmentCourse: PropTypes.object.isRequired,
  getUploadedAssignment: PropTypes.func.isRequired,
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
})(AssignmentFileStudent);
