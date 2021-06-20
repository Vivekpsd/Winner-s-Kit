import {
  GET_ASSIGNMENTS,
  ASSIGNMENT_COURSE,
  ASSIGNMENT_ERROR,
  STUDENT_ASSIGNMENT_UPLOADS,
} from '../actions/types';

const initialState = {
  assignment: [],
  assignments: [],
  courses: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ASSIGNMENT_COURSE:
      return {
        ...state,
        courses: payload,
        loading: false,
      };
    case GET_ASSIGNMENTS:
      return {
        ...state,
        assignments: payload,
        loading: false,
      };
    case ASSIGNMENT_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    case STUDENT_ASSIGNMENT_UPLOADS:
      return {
        ...state,
        assignment: payload,
        loading: false,
      };
    default:
      return state;
  }
}
