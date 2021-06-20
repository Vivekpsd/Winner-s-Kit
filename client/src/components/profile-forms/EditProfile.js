import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaInstagram,
} from 'react-icons/fa';

import { createProfile, getCurrentProfile } from '../../actions/profile';

const EditProfile = ({
  profile: { profile, loading },
  createProfile,
  history,
  getCurrentProfile,
}) => {
  const [formData, setFormData] = useState({
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });

  const {
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(() => {
    getCurrentProfile();

    setFormData({
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      skills: loading || !profile.skills ? '' : profile.skills.join(','),
      bio: loading || !profile.bio ? '' : profile.bio,
      instagram: loading || !profile.social ? '' : profile.social.instagram,
      twitter: loading || !profile.social ? '' : profile.social.twitter,
      facebook: loading || !profile.social ? '' : profile.social.facebook,
      linkedin: loading || !profile.social ? '' : profile.social.linkedin,
      youtube: loading || !profile.social ? '' : profile.social.youtube,
    });
  }, [loading, getCurrentProfile]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true);
  };

  return (
    <Fragment>
      <div className='container pt-5'>
        <h2 className='large text-dark'>Edit Your Profile</h2>
        <p className='lead'>
          <i className='fas fa-user' /> Add some changes to your profile
        </p>
        <form className='form' onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='skills'>Skills</label>
            <input
              id='skills'
              className='form-control'
              type='text'
              placeholder='Skills'
              name='skills'
              value={skills}
              onChange={onChange}
            />
            <small className='form-text text-muted'>
              Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
            </small>
          </div>
          <div className='form-group'>
            <label htmlFor='gituser'>Github Username</label>
            <input
              id='gituser'
              className='form-control'
              type='text'
              placeholder='Github Username'
              name='githubusername'
              value={githubusername}
              onChange={onChange}
            />
            <small className='form-text text-muted'>
              If you want your latest repos and a Github link, include your
              username
            </small>
          </div>
          <div className='form-group'>
            <label htmlFor='bio'>Bio</label>
            <textarea
              placeholder='A short bio of yourself'
              id='bio'
              className='form-control'
              name='bio'
              value={bio}
              onChange={onChange}
            />
            <small className='form-text text-muted'>
              Tell us a little about yourself
            </small>
          </div>

          <div className='my-2'>
            <button
              onClick={() => toggleSocialInputs(!displaySocialInputs)}
              type='button'
              className='btn btn-warning'
            >
              Add Social Network Links
            </button>
            <span className='form-text text-muted'>Optional</span>
          </div>

          {displaySocialInputs && (
            <Fragment>
              <div className='form-group social-input'>
                <label htmlFor='twitter'>
                  <FaTwitter />
                  &nbsp; Twitter
                </label>

                <input
                  type='text'
                  id='twitter'
                  placeholder='Twitter URL'
                  name='twitter'
                  value={twitter}
                  onChange={onChange}
                  className='form-control'
                />
              </div>

              <div className='form-group social-input'>
                <label htmlFor='facebook'>
                  {' '}
                  <FaFacebook /> Facebook
                </label>
                <input
                  type='text'
                  placeholder='Facebook URL'
                  name='facebook'
                  value={facebook}
                  onChange={onChange}
                  className='form-control'
                />
              </div>

              <div className='form-group social-input'>
                <label htmlFor='youtube'>
                  <FaYoutube />
                  &nbsp; Youtube
                </label>
                <input
                  type='text'
                  placeholder='YouTube URL'
                  name='youtube'
                  value={youtube}
                  onChange={onChange}
                  className='form-control'
                />
              </div>

              <div className='form-group social-input'>
                <label htmlFor='linkedin'>
                  <FaLinkedin />
                  &nbsp; LinkedIn
                </label>
                <input
                  type='text'
                  placeholder='Linkedin URL'
                  name='linkedin'
                  value={linkedin}
                  onChange={onChange}
                  className='form-control'
                />
              </div>

              <div className='form-group social-input'>
                <label htmlFor='instagram'>
                  <FaInstagram />
                  &nbsp; Instagram
                </label>
                <input
                  type='text'
                  placeholder='Instagram URL'
                  name='instagram'
                  value={instagram}
                  onChange={onChange}
                  className='form-control'
                />
              </div>
            </Fragment>
          )}

          <input type='submit' className='btn btn-primary my-1 mr-2' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </div>
      <br></br>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(EditProfile)
);
