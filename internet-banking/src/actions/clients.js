import axios from 'axios';

export const FETCH_CLIENTS = "FETCH_CLIENTS";
export const FETCH_CLIENTS_STATUS = "FETCH_CLIENTS_STATUS";
export const ADD_CLIENT = "ADD_CLIENT";

export function fetchClients() {
  return function (dispatch) {
    axios.get('http://localhost:3000/employee/user')
      .then(res => res.data)
      .then(data => {
        const { resp, isError, msg } = data;
        if (isError) {
          dispatch(fetchClientsStatus(0));
        } else {
          dispatch(fetchClientsStatus(true));
          dispatch({ type: FETCH_CLIENTS, data: resp });
        }
      })
      .catch(error => {
        dispatch(fetchClientsStatus(0));
      })
  }
}

export function fetchClientsStatus(status) {
  return {
    type: FETCH_CLIENTS_STATUS,
    status
  }
}

export function addClient(data) {
  return (dispatch) => new Promise((resolve, reject) => {
    axios(`http://localhost:3000/employee/add-user`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...data
      }
    })
      .then(res => res.data)
      .then(data => {
        const { resp, isError } = data;

        if (!isError) {
          dispatch({ type: ADD_CLIENT, data: resp });
          resolve(data);
        }
      })
      .catch(err => reject(err));
  });
}