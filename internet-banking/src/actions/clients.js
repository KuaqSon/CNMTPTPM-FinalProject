import axios from 'axios';

export const FETCH_CLIENTS = "FETCH_CLIENTS";
export const FETCH_CLIENTS_STATUS = "FETCH_CLIENTS_STATUS";

export function fetchClients() {
  return function (dispatch) {
    axios.get('http://localhost:3000/employee/user')
      .then(res => res.data)
      .then(data => {
        const {resp, isError, msg } = data;
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
