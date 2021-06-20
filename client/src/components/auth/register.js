import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import { FaAddressBook, FaUser, FaCode } from 'react-icons/fa';

import SignupImg from '../../img/signup.png';
import './auth.css';

import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Password do not match', 'danger');
    } else {
      register({ name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <Fragment>
      <div
        className='container'
        style={{
          paddingTop: '40px',
          paddingBottom: '100px',
        }}
      >
        <div className='card p-5 shadow-lg'>
          <div className='row align-items-center'>
            <div className='col-5'>
              <h2 className='login-head'>Sign Up</h2>
              <img
                src={SignupImg}
                alt='login'
                height='400'
                style={{ borderRadius: '30px' }}
              />
            </div>
            <div className='col-1'></div>
            <div className='col-5'>
              <br></br>
              <span className='card-text'>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                  <div className='form-group'>
                    <label htmlFor='name'>
                      <FaAddressBook />
                      &nbsp; Name
                    </label>

                    <input
                      type='text'
                      placeholder='Name'
                      id='name'
                      name='name'
                      value={name}
                      className='form-control rounded-input'
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>
                      <FaUser />
                      &nbsp; Email
                    </label>
                    <input
                      type='email'
                      placeholder='Email Address '
                      name='email'
                      id='email'
                      className='form-control rounded-input'
                      value={email}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='pass'>
                      <FaCode />
                      &nbsp;Password
                    </label>
                    <input
                      type='password'
                      placeholder='Password'
                      name='password'
                      id='pass'
                      className='form-control rounded-input'
                      value={password}
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='pass2'>
                      <FaCode />
                      &nbsp;Confirm Password
                    </label>
                    <input
                      type='password'
                      placeholder='Confirm Password'
                      name='password2'
                      id='pass2'
                      className='form-control rounded-input'
                      value={password2}
                      minLength='6'
                      onChange={(e) => onChange(e)}
                    />
                  </div>
                  <input
                    type='submit'
                    className='login-button mt-4'
                    value='Register '
                  />
                </form>
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <div
        className='container-fluid'
        style={{
          paddingTop: '60px',
        }}
      >
        <div className='row'>
          <div className='col-sm-6 mx-auto mt-4'>
            <div className='card text-dark bg-light mb-3 shadow p-3 mb-5 bg-white rounded'>
              <h2 className='display-4 text-center'>Sign Up</h2>
              <div className='card-body'>
                <span className='card-text'>
                  <form className='form' onSubmit={(e) => onSubmit(e)}>
                    <div className='form-group'>
                      <label htmlFor='name'>
                        <FaAddressBook />
                        &nbsp; Name
                      </label>

                      <input
                        type='text'
                        placeholder='Name'
                        id='name'
                        name='name'
                        value={name}
                        className='form-control'
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='email'>
                        <FaUser />
                        &nbsp; Email
                      </label>
                      <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        id='email'
                        className='form-control'
                        value={email}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='pass'>
                        <FaCode />
                        &nbsp;Password
                      </label>
                      <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        id='pass'
                        className='form-control'
                        value={password}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div className='form-group'>
                      <label htmlFor='pass2'>
                        <FaCode />
                        &nbsp;Confirm Password
                      </label>
                      <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        id='pass2'
                        className='form-control'
                        value={password2}
                        minLength='6'
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <input
                      type='submit'
                      className='btn btn-info btn-block'
                      value='Register '
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

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { setAlert, register })(Register);
