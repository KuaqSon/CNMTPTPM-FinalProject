import axios from 'axios';

export const ADD_PAYMENT = "ADD_PAYMENT";
export const FETCH_PAYMENT = "FETCH_PAYMENT";
export const FETCH_PAYMENT_STATUS = "FETCH_PAYMENT_STATUS";

export function addPayment(data) {
  return (dispatch) => new Promise((resolve, reject) => {
    axios(`http://localhost:3000/employee/add-account`, {
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
          dispatch({ type: ADD_PAYMENT, data: resp });
          resolve(data);
        }
      })
      .catch(err => reject(err));
  });
}

export function fetchPayment(data) {
  return (dispatch) => new Promise((resolve, reject) => {
    axios(`http://localhost:3000/employee/accounts`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        ...data
      }
    })
      .then(res => res.data)
      .then(data => {
        const { resp, isError, msg } = data;
        if (isError) {
          dispatch(fetchPaymentStatus(0));
        } else {
          dispatch(fetchPaymentStatus(true));
          dispatch({ type: FETCH_PAYMENT, data: resp });
        }
      })
      .catch(error => {
        dispatch(fetchPaymentStatus(0));
      })
  });
}

export function fetchPaymentStatus(status) {
  return {
    type: FETCH_PAYMENT_STATUS,
    status
  }
}