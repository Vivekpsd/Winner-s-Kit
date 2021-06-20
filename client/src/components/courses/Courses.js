import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import { getCourses } from '../../actions/course';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import DashboardAction from '../dashboard/DashboardAction';
import { Link } from 'react-router-dom';
import CourseItem from './CourseItem';
import StudentCourseItem from './StudentCourseItem';

const Courses = ({
  getCourses,
  course: { courses, loading },
  getCurrentProfile,
  profile: { profile },
}) => {
  useEffect(() => {
    getCourses();
    getCurrentProfile();
  }, [getCourses, getCurrentProfile]);
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container pt-5'>
            <div className='row'>
              <div className='col-12'>
                <h2 className='large text-dark'>Courses</h2>
                <p className='lead'>
                  <i className='fab fa-connectdevelop' /> Browse our Courses
                </p>

                <div>
                  <p className=''></p>
                  <Link to='/create-course' className='btn btn-info'>
                    Add Course
                  </Link>
                  &nbsp;
                  <Link to='/dashboard' className='btn btn-dark'>
                    Go Back To Dashboard
                  </Link>
                </div>

                <br></br>
                <div className='row'>
                  {courses.length > 0 ? (
                    courses.map((course) => (
                      <StudentCourseItem
                        key={course._id}
                        course={course}
                        role={profile.user.role}
                      />
                    ))
                  ) : (
                    <h4>No courses found...</h4>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Courses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCourses, getCurrentProfile })(
  Courses
);
