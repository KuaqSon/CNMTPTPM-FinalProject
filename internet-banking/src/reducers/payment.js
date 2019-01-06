import {
  FETCH_PAYMENT,
  FETCH_PAYMENT_STATUS,
} from '../actions/payment';

const initialState = {
  data: [],
  status: false
};

const payment = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PAYMENT:
      return {
        ...state,
        data: [...action.data]
      }

    case FETCH_PAYMENT_STATUS:
      return {
        ...state,
        status: action.status
      }

    default:
      return state;
  }
}

export default payment;