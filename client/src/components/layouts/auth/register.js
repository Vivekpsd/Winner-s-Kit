import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const Register = ({ setAlert }) => {
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
      const newUser = {
        name,
        email,
        password,
      };

      try {
        const config = {
          header: {
            'Content-Type': 'application/json',
          },
        };

        const res = await axios.post('/api/users', newUser, config);
        console.log(res.data);
      } catch (err) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className=''>Create Your Account</i>
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            name='email'
            value={email}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            minLength='6'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password2'
            value={password2}
            minLength='6'
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register ' />
      </form>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Register);
