import axios from 'axios';
import { setAlert } from './alert';

import {
  CLEAR_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  GET_PROFILES,
  UPDATE_PROFILE,
  UPDATE_COURSE,
} from './types';

//Get Current Profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get all profile

export const getProfiles = () => async (dispatch) => {
  dispatch({
    type: CLEAR_PROFILE,
  });
  try {
    const res = await axios.get('/api/profile/');

    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Profile by Id
export const getProfileById = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${userId}`);
    console.log(res.data);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Crate or update profile

export const createProfile =
  (formData, history, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };

      const res = await axios.post('/api/profile', formData, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });

      dispatch(
        setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success')
      );
      if (!edit) {
        history.push('/dashboard');
      }
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };

// Send Message

export const sendMessage = (formDate, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/profile/message', formDate, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Message Sent', 'success'));
    history.push('/message');
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, 'danger'));
      });
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Add Course in profile

export const enrollStudent =
  (courseID, userID, history) => async (dispatch) => {
    console.log(courseID);
    try {
      const config = {
        header: {
          'Content-Type': 'application/json',
        },
      };
      const body = { courseID, userID };
      const res = await axios.put(
        `/api/profile/enroll/${courseID}`,
        body,
        config
      );

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data,
      });
      dispatch(setAlert('You are  Enrolled', 'success'));
    } catch (err) {
      console.log('error');
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: 'Failed' },
      });
    }
  };

// Add Course in profile(teacher)

export const enrollTeacher = (courseID, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/profile/enroll/${courseID}`,
      courseID,
      config
    );
    console.log(courseID);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    console.log('error');
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
