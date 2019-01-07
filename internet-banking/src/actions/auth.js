import axios from 'axios';

export const FETCH_USER_DATA = "FETCH_USER_DATA";
export const USER_LOGIN_STATUS = "USER_LOGIN_STATUS";

export function login(data) {
  return (dispatch) => new Promise((resolve, reject) => {
    axios(`http://localhost:3000/user/login`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json', },
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

export function logout(data) {
  const userData = localStorage.getItem('userData');
  if (userData) {
    const { _id } = userData;
    return function (dispatch) {
      axios(`http://localhost:3000/user/logout`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        data: {
          idUser: _id
        }
      })
      localStorage.setItem('userData', null);
      localStorage.setItem('x-access-token', '');
      localStorage.setItem('refreshToken', '');
    }
  }
}

function setUserData(data) {
  console.log(data);
  const { user, acceptToken, rfToken } = data;
  localStorage.setItem('userData', JSON.stringify(user));
  localStorage.setItem('x-access-token', acceptToken);
  localStorage.setItem('refreshToken', rfToken);
}

export function fetchUserData() {
  const userData = localStorage.getItem('userData');
  if (userData) {
    return function (dispatch) {
      dispatch({
        type: FETCH_USER_DATA,
        data: JSON.parse(userData)
      });
    }
  } else {
    return function (dispatch) {
      dispatch({
        type: FETCH_USER_DATA,
        data: { name: '', _id: '' }
      });
    }
  }

}

export function loginStatus(status) {
  return {
    type: USER_LOGIN_STATUS,
    status
  }
}