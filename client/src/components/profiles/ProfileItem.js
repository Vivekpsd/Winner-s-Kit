import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfilePic from '../layouts/ProfilePic';
import User from '../../img/user.png';
import { FcBookmark } from 'react-icons/fc';
const ProfileItem = ({
  profile: {
    user: { _id, name, avatar, role },
    bio,
    skills,
    githubusername,
  },
}) => {
  return (
    <div className='col-4'>
      <div className='card text-dark bg-light mb-3 shadow p-3 mb-5 bg-white rounded'>
        <div className='card-body'>
          <span className='card-text'>
            <div className='container'>
              <div>
                <div className='col-12 '>
                  <center>
                    <div className='col-12 '>
                      {avatar ? (
                        <img
                          src={avatar}
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
                    <div className='col-12 justify-content-center'>
                      <hr></hr>
                      <h4>{name.toUpperCase()}</h4>

                      {role === 'admin' && (
                        <div className='badge badge-danger p-2 mt-2 mb-2'>
                          Admin
                        </div>
                      )}
                      {role === 'student' && (
                        <div className='badge badge-info p-2 mt-2 mb-2'>
                          Student
                        </div>
                      )}
                      {role === 'teacher' && (
                        <div className='badge badge-warning p-2 mt-2 mb-2'>
                          Teacher
                        </div>
                      )}
                      <br></br>
                      <br></br>
                      <Link to={`/profile/${_id}`} className='login-button '>
                        View Profile
                      </Link>
                    </div>
                  </center>
                </div>
              </div>
            </div>
          </span>
        </div>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
