import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { FaUser, FaCode } from 'react-icons/fa';
import LoginImg from '../../img/LoginImg.jpg';
import './auth.css';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  //redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  const { email, password } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <Fragment>
      <div
        className='container'
        style={{
          paddingTop: '100px',
          paddingBottom: '100px',
        }}
      >
        <div className='card p-5 shadow-lg'>
          <div className='row align-items-center'>
            <div className='col-5'>
              <img
                src={LoginImg}
                alt='login'
                height='400'
                style={{ borderRadius: '30px' }}
              />
            </div>
            <div className='col-1'></div>
            <div className='col-5'>
              <h2 className='login-head'>Login</h2>
              <br></br>
              <span className='card-text'>
                <form className='form login-form' onSubmit={(e) => onSubmit(e)}>
                  <div className='form-group'>
                    <label htmlFor='email'>
                      {' '}
                      <FaUser />
                      &nbsp; Email
                    </label>
                    <input
                      id='email'
                      type='email'
                      className='form-control rounded-input'
                      placeholder='Your Email'
                      name='email'
                      value={email}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>
                      <FaCode />
                      &nbsp;Password
                    </label>
                    <input
                      id='password'
                      type='password'
                      placeholder='Password'
                      className='form-control rounded-input'
                      name='password'
                      value={password}
                      minLength='6'
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <br></br>

                  <br></br>
                  <input type='submit' className='login-button' value='login' />
                </form>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className='container-fluid'
        style={{
          paddingTop: '70px',
        }}
      >
        <div className='row'>
          <div className='col-3'></div>
          <div className='col-4 mx-auto mt-4'>
            <div className='card text-dark bg-light mb-3 p-3 mb-5 bg-white rounded'>
              <h2 className='text-center'>Login</h2>
              <div className='card-body'>
                <span className='card-text'>
                  <hr></hr>
                  <form className='form' onSubmit={(e) => onSubmit(e)}>
                    <div className='form-group'>
                      <label htmlFor='email'>
                        {' '}
                        <FaUser />
                        &nbsp; Email
                      </label>
                      <input
                        id='email'
                        type='email'
                        className='form-control'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='password'>
                        <FaCode />
                        &nbsp;Password
                      </label>
                      <input
                        id='password'
                        type='password'
                        placeholder='Password'
                        className='form-control'
                        name='password'
                        value={password}
                        minLength='6'
                        onChange={(e) => onChange(e)}
                        required
                      />
                    </div>
                    <br></br>
                    <input
                      type='submit'
                      className='btn btn-info btn-block'
                      value='login'
                    />
                  </form>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </Fragment>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { login })(Login);
