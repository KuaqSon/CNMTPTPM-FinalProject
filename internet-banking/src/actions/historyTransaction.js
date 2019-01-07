import axios from 'axios';

export const FETCH_HISTORIES_TRANSACTION = 'FETCH_HISTORIES_TRANSACTION'
export const FETCH_HISTORY_STATUS = 'FETCH_HISTORY_STATUS';

export function fetchHistory(data) {    
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

        axios(`http://localhost:3000/user/history`, {
            method: 'post',
            headers: h,
            data: {
                ...data
            }
          }).then(res => res.data)
            .then(data => {
                console.log('result '+ JSON.stringify(data));
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