import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import { getCourses } from '../../actions/course';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CourseItem from './CourseItem';
import StudentCourseItem from '../courses/StudentCourseItem';
import ProfilePic from '../layouts/ProfilePic';

const TeacherCourses = ({
  getCourses,
  course: { course, courses, loading },
  profile: { profile },
}) => {
  useEffect(() => {
    getCourses();
    getCurrentProfile();
  }, [getCourses, getCurrentProfile]);

  function roundToTwo(num) {
    return +(Math.round(num + 'e+2') + 'e-2');
  }

  const getStarAverage = (course) => {
    let sum = 0,
      len = 0;
    course.review.map((review) => {
      sum += review.star;
      len += 1;
    });

    let avg = sum / len;
    let ans = roundToTwo(avg);
    return ans;
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container mt-5'>
            <div className='' style={{ paddingTop: '50px' }}>
              <h2>All Courses</h2>
              <hr></hr>
            </div>
            <div className='row'>
              {courses.length > 0 ? (
                courses.map((course) => (
                  <StudentCourseItem
                    course={course}
                    key={course._id}
                    role={profile.user.role}
                  />
                ))
              ) : (
                <h4>No courses found...</h4>
              )}
            </div>
          </div>
          <br></br>
          <br></br>
        </Fragment>
      )}
    </Fragment>
  );
};

TeacherCourses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCourses, getCurrentProfile })(
  TeacherCourses
);
