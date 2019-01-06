import {
  USER_DATA,
  USER_LOGIN_STATUS,
  } from '../actions/auth';
  
  const initialState = {
    data: [],
    status: false
  };
  
  const auth = (state = initialState, action) => {
    switch (action.type) {
      case USER_DATA:
        return {
          ...state,
          data: action.data
        }
  
    case USER_LOGIN_STATUS:
      return {
        ...state,
        status: action.status
      }
    default:
        return state;
    }
  }
  
  export default auth;