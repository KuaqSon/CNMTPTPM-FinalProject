import axios from 'axios';

export const TRANSACTION_SEND_CARD = "TRANSACTION_SEND_CARD";

export function setSendCard(data) {
    return function (dispatch) {
        dispatch({type: TRANSACTION_SEND_CARD, data})
    }
}