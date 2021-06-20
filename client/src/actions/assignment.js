import axios from 'axios';
import { setAlert } from './alert';

import {
  ASSIGNMENT_COURSE,
  ASSIGNMENT_ERROR,
  GET_ASSIGNMENTS,
  STUDENT_ASSIGNMENT_UPLOADS,
} from './types';

//Get all Courses
export const getAssignmentCourse = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/assignment/courselist');

    dispatch({
      type: ASSIGNMENT_COURSE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ASSIGNMENT_ERROR,
      payload: { msg: err.response },
    });
  }
};
//Get all assignment uploaded by student
export const getUploadedAssignment = (courseID) => async (dispatch) => {
  console.log(courseID);
  try {
    const res = await axios.get(`/api/assignment/course-list/${courseID}`);

    dispatch({
      type: GET_ASSIGNMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ASSIGNMENT_ERROR,
      payload: { msg: err.response },
    });
  }
};

//Get uploaded assignments by student in specific courses - Teacher
export const getUploadedAssignments = (courseID, name) => async (dispatch) => {
  console.log(name);
  console.log(courseID);
  try {
    const res = await axios.get(
      `/api/assignment/assignmentuploded/${courseID}/${name}`
    );

    dispatch({
      type: STUDENT_ASSIGNMENT_UPLOADS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ASSIGNMENT_ERROR,
      payload: { msg: err.response },
    });
  }
};

//File Uploaded By Student - By student

//Assignment
export const uploadAssignmentStudent = (
  formData,
  username,
  email,
  courseID,
  assignID
) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/api/assignment/student/${courseID}/${assignID}/${username}/${email}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    // dispatch({
    //   type: ADD_ASSIGNEMNT,
    //   payload: res2.data,
    // });
    dispatch(setAlert('Assignment Uploaded', 'success'));
  } catch (err) {
    console.log(err.message);
  }
};
