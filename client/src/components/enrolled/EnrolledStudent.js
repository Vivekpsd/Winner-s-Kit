import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { Link, withRouter } from 'react-router-dom';
import { getCourseById } from '../../actions/course';
import { getProfiles } from '../../actions/profile';
import ProfileItem from '../profiles/ProfileItem';

const EnrolledStudent = ({
  getProfiles,
  profile: { profiles },
  match,
  getCourseById,
  course: { course, loading },
}) => {
  useEffect(() => {
    getProfiles();
    getCourseById(match.params.id);
  }, [getCourseById, getProfiles]);

  const test = (studentID) => {
    return profiles.length > 0 ? (
      profiles.map((profile) => {
        return (
          profile.user._id === studentID && (
            <ProfileItem key={profile._id} profile={profile} />
          )
        );
      })
    ) : (
      <h4 className='pt-5'>No profiles found...</h4>
    );

    // <div className='container pt-4'>
    //   {profiles.length > 0 ? (
    //     profiles.map((profile) => {
    //       return (
    //         <div className='row'>
    //           {profile.user._id === studentID && (
    //             <ProfileItem key={profile.user._id} profile={profile} />
    //           )}
    //         </div>
    //       );
    //     })
    //   ) : (
    //     <h4>No profiles found...</h4>
    //   )}
    //</div>
  };
  return (
    <Fragment>
      {course === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container pt-5'>
            <div className='row'>
              <div className='col-12'>
                <h2 className='large text-dark'>Enrolled Students</h2>
                <p className='lead'>
                  <i className='fab fa-connectdevelop' /> View Profiles of
                  Students Enrolled
                </p>
                <Link to='/dashboard' className='btn btn-dark'>
                  Back To Dashboard
                </Link>

                <br></br>
                <br></br>

                <div className='profiles row'>
                  {course.enrolledStudent.length > 0 ? (
                    course.enrolledStudent.map((student) => {
                      return test(student);
                    })
                  ) : (
                    <h4>No student found...</h4>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* <div className='container'>
            <div className='profiles'>
              {course.enrolledStudent.length > 0 ? (
                course.enrolledStudent.map((student) => {
                  return <div>{test(student)} </div>;
                })
              ) : (
                <h4>No student found...</h4>
              )}
            </div>
          </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

EnrolledStudent.propTypes = {
  getCourseById: PropTypes.func.isRequired,
  getProfiles: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapSatateToProps = (state) => ({
  course: state.course,
  profile: state.profile,
});

export default connect(mapSatateToProps, {
  getCourseById,
  getProfiles,
})(withRouter(EnrolledStudent));
