import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfilePic from '../layouts/ProfilePic';
import CourseImage from '../../img/courseImgs/aboutus.png';

const CourseItem = ({
  course: {
    _id,
    img,
    title,
    content,
    description,
    teacher,
    enrolledStudent,
    startDate,
    endDate,
    review,
  },
}) => {
  return (
    <div className='card text-dark bg-light mb-3 shadow p-3 mb-5 bg-white rounded'>
      <div className='card-body'>
        <span className='card-text'>
          <div className='container'>
            <div className='row'>
              <div
                className='col-2'
                style={{
                  backgroundImage: `url(${
                    process.env.PUBLIC_URL + '/courses/' + img
                  })`,
                  height: '300px',
                  backgroundSize: 'cover',
                }}
              >
                {/* <img src={<CourseImage />} alt='course' height='200px' /> */}
              </div>
              <div className='col-4'>
                <h3>{title}</h3>
                <p>{content}</p>
                <hr></hr>
                <p className='text-muted'>{description}</p>
              </div>
              <div className='col-4 ml-auto'>
                <b>Start Date - </b>
                {startDate}
                <br></br>
                <b>End Date - </b>
                {endDate}
                <br></br>
                <b>Taught By -</b>{' '}
                <div className='badge badge-danger badge-lg'>{teacher}</div>
                <br></br>
                <br></br>
                <Link to={`/course/${_id}`} className='btn btn-info'>
                  View Course
                </Link>
              </div>
            </div>
          </div>
          <div>
            <p className='my-1'></p>
          </div>
        </span>
      </div>
    </div>
  );
};

CourseItem.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseItem;
