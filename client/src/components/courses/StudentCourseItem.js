import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';

const StudentCourseItem = ({ course, role }) => {
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
  return (
    <div className='col-4'>
      <div className='card'>
        <div
          style={{
            backgroundImage: `url(${
              process.env.PUBLIC_URL + '/courses/' + course.img
            })`,
            height: '300px',
            backgroundSize: 'cover',
          }}
        ></div>
        <div className='card-body'>
          <h5 className='card-title'>{course.title} &nbsp; &nbsp; &nbsp; </h5>
          <p className='card-text'>
            By {course.teacher}
            <span className='text-muted'>
              <span className='float-right'>
                {course.review.length === 0
                  ? 'No Review'
                  : getStarAverage(course)}{' '}
                ({course.review.length})
              </span>
            </span>
          </p>
          <pre>₹ {course.price}</pre>
          <p className='card-text'>
            {role === 'admin' || role === 'teacher' ? (
              <Link to={`/course/${course._id}`} className='course-btn'>
                View Course&nbsp;
                <FaArrowRight />
              </Link>
            ) : (
              <Link
                to={`/studentcourse/${course._id}`}
                className='course-btn'
                style={{ textDecoration: 'none' }}
              >
                View Course &nbsp;
                <FaArrowRight />
              </Link>
            )}
          </p>
        </div>
      </div>
      <hr></hr>
    </div>
  );
};

export default StudentCourseItem;
