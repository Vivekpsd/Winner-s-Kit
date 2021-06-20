import React, { Fragment, useEffect } from 'react';
import Spinner from '../layouts/Spinner';
import { getProfiles, getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ProfileItem from './ProfileItem';
import { Link } from 'react-router-dom';

const Profiles = ({
  getProfiles,
  profile: { profiles, loading },
  getCurrentProfile,
  profile: { profile },
}) => {
  useEffect(() => {
    getProfiles();
    getCurrentProfile();
  }, [getProfiles, getCurrentProfile]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='container pt-5'>
            <div className='row'>
              <div className='col-12'>
                <h2 className='large text-dark'>Developers</h2>
                <p className='lead'>
                  <i className='fab fa-connectdevelop' /> Browse and connect
                  with developers
                </p>
                <Link to='/dashboard' className='btn btn-dark'>
                  Back To Dashboard
                </Link>

                <br></br>
                <br></br>
                <div className='profiles row'>
                  {profiles.length > 0 ? (
                    profiles.map((profile) => (
                      <ProfileItem key={profile._id} profile={profile} />
                    ))
                  ) : (
                    <h4 className='pt-5'>No profiles found...</h4>
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

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getProfiles, getCurrentProfile })(
  Profiles
);
