import axios from 'axios';
import { setAlert } from './alert';

import {
  COURSES_ERROR,
  GET_COURSES,
  GET_COURSE,
  CLEAR_COURSE,
  UPDATE_COURSE,
  ADD_REVIEW,
  DELETE_REVIEW,
  ADD_ASSIGNEMNT,
  ASSIGNMENT_ERROR,
} from './types';

//Get all Courses
export const getCourses = () => async (dispatch) => {
  console.log('action all course');
  try {
    const res = await axios.get('/api/course');

    dispatch({
      type: GET_COURSES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { msg: err.response },
    });
  }
};

//Get Courses By ID
export const getCourseById = (courseId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/course/id/${courseId}`);

    dispatch({
      type: GET_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create or Update course
export const createCourse = (
  formData,
  imgname,
  img,
  history,
  userID,
  edit = false
) => async (dispatch) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    formData.img = imgname;
    console.log(img);

    const res = await axios.post('/api/course/', formData, config);

    const res3 = await axios.post(
      `/api/course/courseimg/${res.data._id}`,
      img,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    const body = { courseID: res.data._id, userID: userID };

    //Get Current Profile
    const res2 = await axios.put(
      `/api/profile/enroll/${res.data._id}`,
      body,
      config
    );

    dispatch({
      type: GET_COURSE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? 'Course Updated' : 'Course Created', 'success'));
    if (!edit) {
      history.push('/courses');
    }
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: COURSES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Course

export const deleteCourse = (courseId, history) => async (dispatch) => {
  if (window.confirm('Are You Sure?')) {
    try {
      await axios.delete(`/api/course/${courseId}`);

      dispatch({ type: CLEAR_COURSE });
      dispatch(setAlert('Course Removed', 'success'));
      history.push('/courses');
    } catch (err) {
      dispatch({
        type: COURSES_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

// Add Profile into course

export const enrollCourse = (courseID, history) => async (dispatch) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put(
      `/api/course/enroll/${courseID}`,
      courseID,
      config
    );

    dispatch({
      type: UPDATE_COURSE,
      payload: res.data,
    });
    history.push('/student-courses');
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// add comment

export const addComment = (formData) => async (dispatch) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.put('/api/course/course-review', formData, config);
    dispatch({
      type: ADD_REVIEW,
      payload: res.data,
    });
    dispatch(setAlert('Review Added', 'success'));
  } catch (err) {
    dispatch({
      type: COURSES_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//delete comment

export const deleteComment = (courseID, reviewID) => async (dispatch) => {
  if (window.confirm('Are You Sure?')) {
    try {
      const res = await axios.delete(
        `/api/course/delete/${courseID}/${reviewID}`
      );

      dispatch({ type: DELETE_REVIEW, payload: res.data });
      dispatch(setAlert('Comment Removed', 'danger'));
    } catch (err) {
      dispatch({
        type: COURSES_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Assignment
export const uploadAssignment = (formData, formdetails, courseID) => async (
  dispatch
) => {
  try {
    const config = {
      header: {
        'Content-Type': 'application/json',
      },
    };

    const res = await axios.post(
      `/api/course/upload-assignment-info/${courseID}`,
      formdetails,
      config
    );
    const id = res.data._id;
    console.log(courseID);
    console.log(res);
    const res2 = await axios.post(
      `/api/assignment/teacher/${courseID}/${formdetails.title}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    dispatch({
      type: ADD_ASSIGNEMNT,
      payload: res2.data,
    });
    dispatch(setAlert('Assignment Uploaded', 'success'));
  } catch (err) {
    // dispatch({
    //   type: ASSIGNMENT_ERROR,
    //   formdetailsoad: { msg: err.response.statusText, status: err.response.status },
    // });
    console.log(err.message);
  }
  // try {
  //   const config = {
  //     header: {
  //       'Content-Type': 'multipart/form-data',
  //     },
  //   };

  //   console.log(formData);

  //   const res = await axios.post(
  //     '/api/assignment',
  //     config,
  //     formData
  //   );
  //   console.log('back');
  //   dispatch(setAlert('Assignment Uploaded', 'success'));
  //   dispatch({
  //     type: ADD_ASSIGNEMNT,
  //     payload: res.data,
  //   });
  // } catch (err) {
  //   dispatch({
  //     type: ASSIGNMENT_ERROR,
  //     payload: { msg: err.response.statusText, status: err.response.status },
  //   });
  // }
};
