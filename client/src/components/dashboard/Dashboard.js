import React, { useEffect, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../../components/layouts/Spinner';

const Dashboard = ({
  getCurrentProfile,
  auth: { isAuthenticated, user, loading },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      {!isAuthenticated && <Redirect to='/login' />}
      {user === null ? (
        <Spinner />
      ) : (
        <div>
          {user.role === 'admin' && <Redirect to='/admin' />}
          {user.role === 'student' && <Redirect to='/student' />}
          {user.role === 'teacher' && <Redirect to='/teacher' />}
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
