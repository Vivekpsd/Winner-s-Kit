import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { Link, withRouter } from 'react-router-dom';
import { getCourseById } from '../../actions/course';
import { deleteCourse } from '../../actions/course';
import { FaClock, FaStar, FaStarHalf, FaTimes } from 'react-icons/fa';
import { FcCustomerSupport, FcCalendar, FcClock } from 'react-icons/fc';

const Course = ({
  match,
  getCourseById,
  course: { course, loading },
  deleteCourse,
  history,
}) => {
  useEffect(() => {
    getCourseById(match.params.id);
  }, [getCourseById]);
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
    if (ans === null) {
      return 0;
    }
    return ans;
  };
  console.log(process.env);
  return (
    <Fragment>
      {course === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container-fluid'>
            <div className='row'>
              <div className='col-12'>
                <div className='card text-dark bg-light mb-3 shadow p-3 mb-5 bg-white rounded'>
                  <div className='card-body'>
                    <span className='card-text'>
                      <div className='container'>
                        <div className='row'>
                          <div className='col-8'>
                            <Link to='/courses' className='text-info'>
                              Back To All Courses
                            </Link>
                            {course.title && (
                              <p className='display-4'>{course.title} </p>
                            )}
                            <hr></hr>
                            <p style={{ fontSize: '17px' }}>
                              {course.description.substring(0, 250)}...
                            </p>
                            <br></br>

                            <div className='row mt-4'>
                              <div className='col-4 mr-auto'>
                                <span className='infoTitle'>Start Date </span>{' '}
                                &nbsp; &nbsp;
                                <span>{course.startDate}</span>
                              </div>
                              <div className='col-4 ml-auto'>
                                <span className='infoTitle'>End Date </span>{' '}
                                &nbsp; &nbsp;
                                <span>{course.endDate}</span>
                              </div>
                            </div>
                          </div>

                          <div className='col-4 align-self-center'>
                            <div
                              className='card col-12'
                              style={{
                                backgroundImage: `url(${
                                  process.env.PUBLIC_URL +
                                  '/courses/' +
                                  course.img
                                })`,
                                height: '300px',

                                backgroundSize: 'cover',
                              }}
                            ></div>
                            <center>
                              <div className='col-12 login-button'>
                                <h4>₹ {course.price}</h4>
                              </div>
                            </center>
                          </div>
                        </div>

                        <div className='alert alert-info mt-4 mb-4'>
                          <h5>
                            <strong>What you'll learn</strong>
                          </h5>
                          <hr></hr>
                          <p>{course.content}</p>
                        </div>
                        <div className='row'>
                          <div className='col-2'>
                            <p className='badge badge-warning badge-lg'>
                              Bestseller
                            </p>
                          </div>
                          <div className='col-2 mr-auto'>
                            <span
                              style={{
                                fontSize: '20px',
                                backgroundColor: 'black',
                                color: 'yellow',
                                padding: '10px',
                                borderRadius: '5px',
                                boxShadow: '5px 8px #adadad',
                              }}
                            >
                              {course.review.length === 0 ? (
                                <span>N/A</span>
                              ) : (
                                getStarAverage(course)
                              )}
                            </span>
                          </div>
                        </div>
                        <br></br>
                        <div className='row'>
                          <div className='col'>
                            <p>
                              Taught By{' '}
                              <span className='text-info font-weight-bold'>
                                {course.teacher}
                              </span>
                            </p>
                          </div>
                        </div>
                        <hr></hr>
                        <div className='row'>
                          <div className='col'>
                            <h4>Requirements</h4>
                            {course.prerequisite}
                          </div>
                        </div>
                        <div className='row mt-5'>
                          <div className='col'>
                            &nbsp;
                            <Link
                              to={`/editcourse/${course._id}`}
                              className='btn btn-dark'
                            >
                              Edit Course
                            </Link>
                            &nbsp;
                            <Link
                              to={`/viewstudent/${course._id}`}
                              className='btn btn-warning'
                            >
                              View Student
                            </Link>
                            &nbsp;
                            <button
                              onClick={() => deleteCourse(course._id, history)}
                              className='btn btn-danger'
                            >
                              Delete Course
                            </button>
                          </div>
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className='row'>
              <div className='col'>
                <h6>Reviews</h6>
                {course.review && (
                  <div>
                    {course.review.map((review) => {
                      return (
                        <div key={review._id}>
                          <div className='card text-dark mb-3 p-1 mb-5 rounded comment-desc'>
                            <div className='card-body'>
                              <span className='card-text '>
                                <h5 style={{ fontWeight: '700' }}>
                                  <FcCustomerSupport />
                                  &nbsp;&nbsp;
                                  {review.student}
                                </h5>
                                <h5 className='pt-2 pl-4'>{review.comment}</h5>
                                <br></br>
                                <span className='rate-comment ml-4'>
                                  {getStars(review.star)} &nbsp; <FaStar />
                                </span>

                                <hr></hr>
                                <span>
                                  <FcCalendar />
                                  &nbsp;&nbsp;
                                  {review.date.substring(0, 10)}
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                  <FcClock />
                                  &nbsp;&nbsp;
                                  {review.date.substring(11, 16)}
                                </span>
                              </span>
                              <div className='float-right'>
                                {profile.user._id === review.studentID && (
                                  <button
                                    className='btn btn-danger'
                                    onClick={() => {
                                      deleteReview(review._id);
                                    }}
                                  >
                                    Delete
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div> */}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Course.propTypes = {
  getCourseById: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  deleteCourse: PropTypes.func.isRequired,
};
const mapSatateToProps = (state) => ({
  course: state.course,
});

export default connect(mapSatateToProps, {
  getCourseById,
  deleteCourse,
})(withRouter(Course));
