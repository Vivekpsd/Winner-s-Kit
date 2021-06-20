import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

import DashboardImg1 from '../../img/dash1.png';
import DashboardImg2 from '../../img/bgDashboardl.png';
import Spinner from '../layouts/Spinner';

import User from '../../img/user.png';
import ProfileInfo from '../../img/profileInfo.png';
import './dashboardCSS/dashboard.css';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaArrowRight,
} from 'react-icons/fa';
import { FiInfo, FiTarget } from 'react-icons/fi';

const Admin = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <div style={{ paddingBottom: '1000px' }}>
      <Spinner />
    </div>
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
      </div>
    </Fragment>
  );
};

Admin.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Admin);
