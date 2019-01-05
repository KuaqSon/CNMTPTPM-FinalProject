import {
    FETCH_HISTORIES_TRANSACTION,
    FETCH_HISTORY_STATUS
} from '../actions/historyTransaction';
// import { access } from 'fs';

const initialState = {
    data: [],
    status: false
};

const histories = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HISTORIES_TRANSACTION:
            console.log(...action.data);
            return {
                ...state,
                data: [...action.data]
            }

        case FETCH_HISTORY_STATUS:
            return {
                ...state,
                status: action.status
            }

        default:
            return state;
    }
}

export default histories;
