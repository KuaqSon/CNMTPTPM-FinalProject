import axios from 'axios';

export const TRANSACTION_SEND_CARD = "TRANSACTION_SEND_CARD";
export const TRANSACTION_RECIPIENT_CARD = "TRANSACTION_RECIPIENT_CARD";
export const TRANSACTION_INFO = "TRANSACTION_INFO";
export const TRANSACTION_PAYER = "TRANSACTION_PAYER";

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