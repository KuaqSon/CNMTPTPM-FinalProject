import axios from 'axios';

export const ADD_PAYMENT = "ADD_PAYMENT";
export const FETCH_PAYMENT = "FETCH_PAYMENT";
export const FETCH_PAYMENT_STATUS = "FETCH_PAYMENT_STATUS";
export const RECHARGE_PAYMENT = "RECHARGE_PAYMENT";
export const GET_PAYMENT = "GET_PAYMENT";
export const NEGATIVE_PAYMENT = "NEGATIVE_PAYMENT";

export function addPayment(data) {
  const session = {
    refreshToken: localStorage.getItem('refreshToken'),
    token: localStorage.getItem('x-access-token')
  }
  return (dispatch) => new Promise((resolve, reject) => {
    axios(`http://localhost:3000/employee/add-account`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': session.token
      },
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
  return function (dispatch) {

    const session = {
      refreshToken: localStorage.getItem('refreshToken'),
      token: localStorage.getItem('x-access-token')
    }
    axios(`http://localhost:3000/employee/accounts`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': session.token
      },
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
  };
}

export function fetchPaymentStatus(status) {
  return {
    type: FETCH_PAYMENT_STATUS,
    status
  }
}

export function rechargePayment(data) {
  return (dispatch) => new Promise((resolve, reject) => {

    const session = {
      refreshToken: localStorage.getItem('refreshToken'),
      token: localStorage.getItem('x-access-token')
    }
    var h = new Headers();
    h.append('Content-Type', 'application/json');
    if (session.refreshToken && session.token) {
      h.append('x-access-token', session.token);
      // h.append('email', session.email);
    };

    axios(`http://localhost:3000/employee/recharge-payment`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': session.token
      },
      data: {
        ...data
      }
    })
      .then(res => res.data)
      .then(data => {
        const { resp, isError } = data;

        if (!isError) {
          dispatch({ type: RECHARGE_PAYMENT, data: resp });
          resolve(data);
        }
      })
      .catch(err => reject(err));
  });
}

export function getPayment(data) {
  return (dispatch) => new Promise((resolve, reject) => {

    const session = {
      refreshToken: localStorage.getItem('refreshToken'),
      token: localStorage.getItem('x-access-token')
    }
    var h = new Headers();
    h.append('Content-Type', 'application/json');
    if (session.refreshToken && session.token) {
      h.append('x-access-token', session.token);
      // h.append('email', session.email);
    };


    axios(`http://localhost:3000/user/find-account`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': session.token
      },
      data: {
        ...data
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data);
        dispatch({ type: GET_PAYMENT, data: data });
        resolve(data);
      })
      .catch(error => reject(error))
  })
}

export function negativePayment(data) {
  return (dispatch) => new Promise((resolve, reject) => {

    const session = {
      refreshToken: localStorage.getItem('refreshToken'),
      token: localStorage.getItem('x-access-token')
    }
    var h = new Headers();
    h.append('Content-Type', 'application/json');
    if (session.refreshToken && session.token) {
      h.append('x-access-token', session.token);
      // h.append('email', session.email);
    };

    axios(`http://localhost:3000/user/active-account`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': session.token
      },
      data: {
        ...data
      }
    })
      .then(res => res.data)
      .then(data => {
        console.log(data);
        dispatch({ type: NEGATIVE_PAYMENT, data: data });
        resolve(data);
      })
      .catch(error => reject(error));
  })
}