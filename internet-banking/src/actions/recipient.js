import axios from 'axios';

export const FETCH_RECIPIENT = "FETCH_RECIPIENT";
export const FETCH_RECIPIENT_STATUS = "FETCH_RECIPIENT_STATUS";
export const ADD_RECIPIENT = "ADD_RECIPIENT";
export const DELETE_RECIPIENT = "DELETE_RECIPIENT";
export const EDIT_RECIPIENT = "EDIT_RECIPIENT";

export function fetchRecipient(data) {
  return function (dispatch) {
    axios(`http://localhost:3000/user/recivers`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...data
      }
    }).then(res => res.data)
      .then(data => {
        const { resp, isError, msg } = data;
        if (isError) {
          dispatch(fetchRecipientStatus(false));
        } else {
          dispatch(fetchRecipientStatus(true));
          dispatch({ type: FETCH_RECIPIENT, data: resp });
        }
      })
      .catch(error => {
        dispatch(fetchRecipientStatus(false));
      })
  }
}

export function fetchRecipientStatus(status) {
  return {
    type: FETCH_RECIPIENT_STATUS,
    status
  }
}

export function addRecipient(data) {
  return (dispatch) => new Promise((resolve, reject) => {
    axios(`http://localhost:3000/user/add-receiver`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...data
      }
    })
      .then(res => res.data)
      .then(data => {
        dispatch({ type: ADD_RECIPIENT, data });
        resolve(data);
      })
      .catch(err => reject(err));
  })
}
