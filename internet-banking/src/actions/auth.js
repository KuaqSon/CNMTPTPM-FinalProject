import axios from 'axios';

export const USER_DATA = "USER_DATA";
export const USER_LOGIN_STATUS = "USER_LOGIN_STATUS";

export function login(data) {
  return (dispatch) => new Promise((resolve, reject) => {
    axios(`http://localhost:3000/user/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...data
      }
    })
      .then(res => res.data)
      .then(data => {
        const { resp, isError, msg } = data;
        const { user } = resp;
        if (isError) {
          dispatch(loginStatus(0));
        } else {
          dispatch(loginStatus(true));
          resolve(data);
          dispatch(userData(user));
        }
      })
      .catch(error => {
        dispatch(loginStatus(0));
      })
  });
}

export function userData(user) {
  console.log(user);
  return {
    type: USER_DATA,
    data: user
  }
}

export function loginStatus(status) {
  return {
    type: USER_LOGIN_STATUS,
    status
  }
}