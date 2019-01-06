import axios from 'axios';

export const FETCH_USER_DATA = "FETCH_USER_DATA";
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
        resolve(data);
        if (isError) {
          dispatch(loginStatus(0));
        } else {
          dispatch(setUserData(resp));
          dispatch(loginStatus(true));
        }
      })
      .catch(error => {
        dispatch(loginStatus(0));
      })
  });
}

export function logout() {
  return function (dispatch) {
    localStorage.setItem('userData', null);
  }
}

function setUserData(data) {
  console.log(data);
  const {user} = data;
  localStorage.setItem('userData',  JSON.stringify(user));
  console.log(localStorage.getItem('userData'));
  console.log(JSON.parse(localStorage.getItem('userData')));
}

export function fetchUserData() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    return {
      type: FETCH_USER_DATA,
      data: JSON.parse(userData)
    }
  } else {
    return {
      type: FETCH_USER_DATA,
      data: {
        name: ''
      }
    }
  }
  
}

export function loginStatus(status) {
  return {
    type: USER_LOGIN_STATUS,
    status
  }
}