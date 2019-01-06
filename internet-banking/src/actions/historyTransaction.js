import axios from 'axios';

export const FETCH_HISTORIES_TRANSACTION = 'FETCH_HISTORIES_TRANSACTION'
export const FETCH_HISTORY_STATUS = 'FETCH_HISTORY_STATUS';

export function fetchHistory(accountNumber) {
    return function (dispatch) {
        const data = JSON.stringify({ accountNumber: 159263478 })
        axios({
            method: 'POST',
            url: 'http://localhost:3000/user/history',
            data: { accountNumber: 159263478 },
            headers: {
                'token': 'Basic-Y2xpZW50OnNlY3JldA==',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
        }).then(res => res.data)
            .then(data => {
                console.log(data);
                const { resp, isError, msg } = data;
                if (isError) {
                    dispatch(fetchHistoryStatus(false));
                } else {
                    dispatch(fetchHistoryStatus(true));
                    dispatch({ type: FETCH_HISTORIES_TRANSACTION, data: resp });
                }
            })
            .catch(error => {
                dispatch(fetchHistoryStatus(false));
            })
    }
}

export function fetchHistoryStatus(status) {
    return {
        type: FETCH_HISTORY_STATUS,
        status
    }
}