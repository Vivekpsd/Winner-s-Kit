import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import { getCourses } from '../../actions/course';

import {
  getAssignmentCourse,
  getUploadedAssignment,
  getUploadedAssignments,
} from '../../actions/assignment';
import Spinner from '../layouts/Spinner';
import axios from 'axios';

const ViewUploadedAssignment = ({
  match,
  getCourses,
  course: { courses, loading },
  getCurrentProfile,
  profile: { profile },
  getAssignmentCourse,
  getUploadedAssignment,
  getUploadedAssignments,
  assignment,
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCourses();
    getAssignmentCourse();
    getUploadedAssignment(match.params.id);
    getUploadedAssignments(match.params.id, match.params.name);
  }, [
    getCurrentProfile,
    getCourses,
    getAssignmentCourse,
    getUploadedAssignment,
    getUploadedAssignments,
    match.params.id,
    match.params.name,
  ]);

  const download = async (file) => {
    axios({
      url: `/api/assignment/download-assignment/${match.params.id}/${match.params.name}/${file}`,
      method: 'GET',
      responseType: 'blob',
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = link;

      link.setAttribute('download', file);
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
          {assignment.assignment.map((uploaded) => {
            return (
              <Fragment>
                <div className='container pt-5'>
                  <div className='row'>
                    <div className='col'>
                      <h3>Submitted Assignments</h3>
                      <hr></hr>
                      <table class='table '>
                        <thead class='thead-dark'>
                          <tr>
                            <th scope='col'>File Name</th>
                            <th scope='col'>Student Name</th>
                            <th scope='col'>Student Email</th>
                            <th scope='col'>Download Assignment</th>
                          </tr>
                        </thead>
                        <tbody>
                          <Fragment>
                            <tr>
                              <td>{uploaded}</td>

                              <td>
                                {uploaded.substr(0, uploaded.indexOf('_'))}
                              </td>
                              <td>
                                {uploaded
                                  .substring(uploaded.indexOf('_') + 1)
                                  .slice(0, -4)}
                              </td>
                              <td>
                                <Link
                                  onClick={() => {
                                    download(uploaded);
                                  }}
                                  className='course-btn'
                                >
                                  Download
                                </Link>
                              </td>
                            </tr>
                          </Fragment>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div style={{ height: '250px' }}></div>
              </Fragment>
            );
          })}
        </Fragment>
      )}
    </Fragment>
  );
};

ViewUploadedAssignment.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getAssignmentCourse: PropTypes.object.isRequired,
  getUploadedAssignment: PropTypes.object.isRequired,
  getUploadedAssignments: PropTypes.object.isRequired,
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
  getUploadedAssignments,
})(ViewUploadedAssignment);
