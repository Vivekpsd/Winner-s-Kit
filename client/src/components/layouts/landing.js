import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Home from './Home';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <div className='container'>
      <div className='row'>
        <div className='col'>
          <Home />
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
