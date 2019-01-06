import {
  FETCH_RECIPIENT,
  FETCH_RECIPIENT_STATUS,
} from '../actions/recipient';

const initialState = {
  data: [],
  status: false
};

const recipient = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_RECIPIENT:
      return {
        ...state,
        data: [...action.data]
      }

    case FETCH_RECIPIENT_STATUS:
      return {
        ...state,
        status: action.status
      }

    default:
      return state;
  }
}

export default recipient;