import axios from 'axios';

export const TRANSACTION_SEND_CARD = "TRANSACTION_SEND_CARD";
export const TRANSACTION_RECIPIENT_CARD = "TRANSACTION_RECIPIENT_CARD";
export const TRANSACTION_INFO = "TRANSACTION_INFO";
export const TRANSACTION_PAYER = "TRANSACTION_PAYER";
export const TRANSACTION_CONFIRM = "TRANSACTION_CONFIRM";
export const TRANSACTION_SUBMIT = "TRANSACTION_SUBMIT";

export function setSendCard(data) {
    return function (dispatch) {
        dispatch({type: TRANSACTION_SEND_CARD, data})
    }
}

export function setRecipientCard(data) {
    return function (dispatch) {
        dispatch({type: TRANSACTION_RECIPIENT_CARD, data})
    }
}

export function setTransactionInfo(data) {
    return function (dispatch) {
        dispatch({type: TRANSACTION_INFO, data})
    }
}

export function setTransactionPayer(data) {
    return function (dispatch) {
        dispatch({type: TRANSACTION_PAYER, data})
    }
}

export function callOTP(data) {
    return function (dispatch) {

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

        axios.post(`http://localhost:3000/user/gmail`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json',
              'x-access-token': session.token },
            data: {
                ...data
            }
        })
        .then(res => res.data)
        .then(data => {
            dispatch({ type: TRANSACTION_CONFIRM, data})
        })
        .catch(error => {
        })
    }
}

export function submitData(data) {
    return function (dispatch) {

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

        axios.post(`http://localhost:3000/user/add-transaction`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json',
              'x-access-token': session.token },
            data: {
                ...data
            }
        })
        .then(res => res.data)
        .then(data => {
            dispatch({ type: TRANSACTION_SUBMIT, data})
        })
        .catch(error => {
        })
    }
}