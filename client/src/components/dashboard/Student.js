import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { getCourses } from '../../actions/course';
import Spinner from '../layouts/Spinner';

import DashboardImg1 from '../../img/dash1.png';
import DashboardImg2 from '../../img/bgDashboardl.png';
import Feature1 from '../../img/feature1.png';
import Feature2 from '../../img/feature2.png';
import Feature3 from '../../img/feature3.png';
import User from '../../img/user.png';
import ProfileInfo from '../../img/profileInfo.png';
import '../dashboard/dashboardCSS/dashboard.css';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaArrowRight,
} from 'react-icons/fa';
import { FiInfo, FiTarget } from 'react-icons/fi';
import StudentCourseItem from '../courses/StudentCourseItem';

const Student = ({
  getCurrentProfile,
  auth: { user },
  getCourses,
  profile: { profile, loading },
  course: { courses },
}) => {
  useEffect(() => {
    getCurrentProfile();
    getCourses();
  }, [getCurrentProfile, getCourses]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <div
        className='container-fluid'
        style={{
          backgroundImage: `url(${DashboardImg2})`,
          backgroundSize: 'cover',
          overflow: 'hidden',
        }}
      >
        <div className='row align-items-center' style={{ paddingTop: '90px' }}>
          <div className='col-6'>
            <br></br>
            <br></br>
            <h1 className='pl-5'>
              Welcome to Winner's Kit Training Academy!
              <br></br>
              <br></br>
              <Link to='student-courses' className='login-button'>
                Browse Courses &nbsp;&nbsp; <FaArrowRight />
              </Link>
            </h1>
          </div>
          <div className='col-6'>
            <img src={DashboardImg1} alt='Img1' height='400px' />
          </div>
        </div>
      </div>

      <div className='container-fluid mt-4'>
        <div className='row'>
          <div className='col-11'>
            <div className=' text-dark bg-light mb-3 p-3 bg-white rounded'>
              <div className='container-fluid'>
                <div className='row align-items-center'>
                  <div className='col-1 pl-4'>
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt='User'
                        className='rounded'
                        height='90px'
                      />
                    ) : (
                      <img
                        src={User}
                        alt='User'
                        classNam='rounded'
                        height='90px'
                      />
                    )}
                  </div>
                  <div className='col-3 pl-5'>
                    <h4>{user && user.name.toUpperCase()}</h4>
                    <p>
                      Github -{' '}
                      {profile === null ? 'N/A' : profile.githubusername}
                    </p>
                    <p className='text-muted'>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </p>
                  </div>
                  <div className='col-2 mr-auto'>
                    {profile !== null ? (
                      <Fragment>
                        <Link
                          to='/edit-profile'
                          className='btn btn-outline-dark'
                        >
                          <i className='text-primary' /> Edit Profile
                        </Link>
                      </Fragment>
                    ) : (
                      <Fragment>
                        <Link
                          to='/create-profile'
                          className='btn btn-outline-dark my-1'
                        >
                          Create Profile
                        </Link>
                      </Fragment>
                    )}
                  </div>
                  <div className='col-5 mr-auto'>
                    {profile !== null ? (
                      <h1>
                        <a
                          href='https://www.facebook.com'
                          target='blank'
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          <FaFacebook />
                        </a>
                        &nbsp;&nbsp;
                        <a
                          href='https://www.twitter.com'
                          target='blank'
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          <FaTwitter />
                        </a>
                        &nbsp;&nbsp;
                        <a
                          href='https://www.instagram.com'
                          target='blank'
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          <FaInstagram />
                        </a>
                        &nbsp;&nbsp;
                        <a
                          href='https://www.github.com'
                          target='blank'
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          <FaGithub />
                        </a>
                        &nbsp;&nbsp;
                        <a
                          href='https://www.youtube.com'
                          target='blank'
                          style={{ textDecoration: 'none', color: 'black' }}
                        >
                          <FaYoutube />
                        </a>
                      </h1>
                    ) : (
                      <div className='alert alert-info' role='alert'>
                        <strong>Heads up! {user.name}, </strong> You have not
                        yet setup a profile, please create a new profile for
                        your account.
                      </div>
                    )}
                  </div>
                </div>
                <hr></hr>
                {profile !== null && (
                  <div className='row mt-5 justify-content-center align-items-center'>
                    <div className='col-5'>
                      <img src={ProfileInfo} alt='info' height='550' />
                    </div>
                    <div className='col-7'>
                      <div className='card shadow-lg mb-3   rounded'>
                        <div className='card-body'>
                          <h4
                            style={{
                              color: 'rgb(122, 122, 250)',
                            }}
                          >
                            {' '}
                            <FiInfo />
                            &nbsp; Bio
                          </h4>
                          <span className='card-text'>{profile.bio}</span>
                          <hr></hr>
                          <hr></hr>
                          <h4
                            style={{
                              color: 'rgb(122, 122, 250)',
                            }}
                          >
                            <FiTarget /> &nbsp;Skills
                          </h4>
                          <strong>{user.name}</strong> has knowledge about{' '}
                          <strong>
                            {profile.skills.map((skill) => {
                              return skill + ', ';
                            })}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <br></br>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr></hr>
      <div className='container mt-4'>
        <h2>Your Enrollement</h2>
        <hr></hr>
        <div>
          {profile === null ? (
            <div className='alert alert-info'>
              Dear <strong>{user.name},</strong> you have not yet set up your
              profile. Create your profile to get enrolled in our courses
            </div>
          ) : (
            <Fragment>
              {profile.enrolledCourse.length === 0 && (
                <div className='alert alert-info'>
                  You are not yet enrolled in any courses
                </div>
              )}
              <div className='row'>
                {profile.enrolledCourse.length > 0 &&
                  profile.enrolledCourse.map((course_id) => {
                    return courses.map((course) => {
                      return (
                        course_id === course._id && (
                          <StudentCourseItem course={course} key={course._id} />
                        )
                      );
                    });
                  })}
              </div>
            </Fragment>
          )}
        </div>
      </div>
      <hr></hr>
      <br></br>
      <div className='container'>
        <p className='display-4'>Why choose Us?</p>
        <hr></hr>
        <div className='row text-center'>
          <div className='col-12 col-md-4'>
            <br></br>
            <img src={Feature1} height='100px' width='100px' alt='feature1' />
            <br></br>
            <p>
              Our Service is open 24 x 7. You can book your tickets anytime you
              want. We will be there for you. Always
            </p>
          </div>
          <div className='col-12 col-md-4'>
            <br></br>
            <img src={Feature2} height='100px' width='100px' alt='feature2' />
            <br></br>
            <p>
              Our Website is fully responsive for all the devices out there such
              as mobile, tablet, or desktop
            </p>
          </div>
          <div className='col-12 col-md-4'>
            <br></br>
            <img src={Feature3} height='100px' width='100px' alt='feature3' />
            <br></br>
            <p>
              All your credit and debit card information is secure with us. All
              your transaction details are secured with 3 layer encryption
            </p>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      {/* <h1 className='display-4'>Dashboard</h1> --------------------- Previous Code----------------
      <hr></hr>
      <br></br>
      <div className='card text-dark bg-light mb-3 shadow p-3 mb-5 bg-white rounded'>
        <div className='card-body'>
          <span className='card-text'>
            <div className='container'>
              <div className='row'>
                <div className='col-3'>
                  <ProfilePic />
                </div>
                <div className='col-9'>
                  <p className='lead'>
                    <i className='' /> Welcome <b>{user && user.name}</b>
                    <br></br>
                    <i className='' /> Bio - {profile && profile.bio}
                    <br></br>
                    <span className='badge badge-info'>Role : {user.role}</span>
                    <br></br>
                    <span className='badge badge-info'>Route: Student</span>
                  </p>
                  {profile !== null ? (
                    <Fragment>
                      <DashboardStudent />
                    </Fragment>
                  ) : (
                    <Fragment>
                      <p>
                        You have not yet setup a profile, please add some info
                      </p>
                      <Link
                        to='/create-profile'
                        className='btn btn-outline-dark my-1'
                      >
                        Create Profile
                      </Link>
                    </Fragment>
                  )}
                </div>
              </div>
            </div>
          </span>
        </div>
        <br></br>
        <hr></hr>
      </div> */}
    </Fragment>
  );
};

Student.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getCourses: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  course: state.course,
});

export default connect(mapStateToProps, { getCurrentProfile, getCourses })(
  Student
);
