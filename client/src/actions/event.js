import axios from 'axios';
import { setAlert } from './alert';

import {
  ADD_EVENT,
  GET_EVENTS,
  EVENT_ERROR,
  CLEAR_EVENT,
  GET_EVENT,
} from './types';

// Get all Events
export const allEvents = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/event');

    dispatch({
      type: GET_EVENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response },
    });
  }
};

//Delete Course

export const deleteEvent = (eventID, history) => async (dispatch) => {
  if (window.confirm('Are You Sure?')) {
    try {
      await axios.delete(`/api/event/${eventID}`);

      dispatch({ type: CLEAR_EVENT });
      dispatch(setAlert('Event Removed', 'success'));
      history.push('/events');
    } catch (err) {
      dispatch({
        type: EVENT_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// //Get Event By ID
export const getEventById = (eventID) => async (dispatch) => {
  console.log('hello');
  try {
    const res = await axios.get(`/api/event/id/${eventID}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create Event
export const createEvent = (formData, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post('/api/event/', formData, config);

    dispatch({
      type: GET_EVENT,
      payload: res.data,
    });

    dispatch(setAlert('Event created', 'success'));

    history.push('/events');
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
