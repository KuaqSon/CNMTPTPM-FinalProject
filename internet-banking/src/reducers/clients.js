import {
  FETCH_CLIENTS,
  FETCH_CLIENTS_STATUS,
} from  '../actions/clients';

const initialState = {
  data: [],
  status: false
};

const clients = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CLIENTS: 
      return {
        ...state,
        data: [...action.data]
      }

    case FETCH_CLIENTS_STATUS: 
      return {
        ...state,
        status: action.status
      }

    default:
      return state;
  }
}

export default clients;