import {
  GET_COURSES,
  COURSES_ERROR,
  GET_COURSE,
  CLEAR_COURSE,
  UPDATE_COURSE,
  ADD_REVIEW,
  DELETE_REVIEW,
  ADD_ASSIGNEMNT,
  ASSIGNMENT_ERROR,
} from '../actions/types';

const initialState = {
  course: null,
  courses: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_COURSES:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case COURSES_ERROR:
    case ASSIGNMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case GET_COURSE:
    case UPDATE_COURSE:
    case ADD_REVIEW:
    case ADD_ASSIGNEMNT:
      return {
        ...state,
        course: payload,
        loading: false,
      };
    case DELETE_REVIEW:
      return {
        ...state,
        course: payload,
        loading: false,
      };
    case CLEAR_COURSE:
      return {
        ...state,
        course: null,
        loading: false,
      };
    default:
      return state;
  }
}
