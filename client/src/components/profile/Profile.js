import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layouts/Spinner';
import { Link } from 'react-router-dom';
import UserPic from '../../img/user.png';
import { getProfileById } from '../../actions/profile';
import '../dashboard/dashboardCSS/dashboard.css';
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';
import DashboardActions from '../dashboard/DashboardAction';

const Profile = ({
  getProfileById,
  match,
  profile: { profile, loading },
  auth: { user },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById]);
  return (
    <Fragment>
      {profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container pt-4'>
            <div className='row'>
              <div className='col-12'>
                <Link to='/profiles' className='btn btn-dark'>
                  Back To Profiles
                </Link>
                <br></br>
                <br></br>
                <div className='card text-dark bg-light mb-3 p-3 bg-white rounded'>
                  <div className='card-body'>
                    <span className='card-text'>
                      <div className='container-fluid'>
                        <div className='row align-items-center'>
                          <div className='col-4'>
                            <img
                              src={UserPic}
                              className='rounded'
                              alt='user'
                              height='200px'
                            />
                          </div>
                          <div className='col-5'>
                            <h4>
                              {profile.user.name &&
                                profile.user.name.toUpperCase()}
                            </h4>
                            <p>
                              Github -{' '}
                              {profile === null
                                ? 'N/A'
                                : profile.githubusername}
                            </p>
                            <p className='text-muted'>
                              {profile.user.role.charAt(0).toUpperCase() +
                                profile.user.role.slice(1)}
                            </p>
                          </div>
                          <div className='col-3 mr-auto'></div>
                        </div>
                        <hr></hr>
                        {profile !== null && (
                          <div className='row mt-5 justify-content-center align-items-center'>
                            <div className='col-5'>
                              <div className='card text-light bg-light mb-3  bg-dark rounded'>
                                <div className='card-body'>
                                  <h4>Bio</h4>
                                  <hr></hr>
                                  <span className='card-text'>
                                    {profile.bio}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className='col-5'>
                              <div class='alert alert-info' role='alert'>
                                <h4>Skills</h4>
                                <hr></hr>
                                <strong>{profile.user.name}</strong> have
                                knowledge about{' '}
                                <strong>
                                  {profile.skills.map((skill) => {
                                    return skill + ', ';
                                  })}
                                </strong>
                              </div>
                            </div>
                          </div>
                        )}
                        <br></br>
                        <br></br>
                        {profile !== null && (
                          <div className='row text-center'>
                            <div className='col'>
                              <h1>
                                <FaFacebook />
                                &nbsp;&nbsp;
                                <FaTwitter />
                                &nbsp;&nbsp;
                                <FaInstagram />
                                &nbsp;&nbsp;
                                <FaGithub />
                                &nbsp;&nbsp;
                                <FaYoutube />
                              </h1>
                            </div>
                          </div>
                        )}

                        <div className='row mt-3'>
                          {profile === null && (
                            <div class='alert alert-info' role='alert'>
                              <strong>Heads up! {profile.user.name}, </strong>{' '}
                              You have not yet setup a profile, please create a
                              new profile for your account.
                            </div>
                          )}
                        </div>
                      </div>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapSatateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(mapSatateToProps, {
  getProfileById,
})(Profile);
