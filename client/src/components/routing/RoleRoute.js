import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const RoleRoute = ({
  component: Component,
  role,
  auth: { isAuthenticated, loading, user },
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        user === null ? <Redirect to='/dashboard' /> : <Component {...props} />
      }
    />
  );
};

RoleRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(RoleRoute);
