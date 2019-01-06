import {
    TRANSACTION_SEND_CARD,
  } from  '../actions/transaction';
  
  const initialState = {
    data: [],
    status: false,
    sendCard: ''
  };
  
  const transaction = (state = initialState, action) => {
    switch (action.type) {
      case TRANSACTION_SEND_CARD: 
        return {
          ...state,
          sendCard: action.data
        }
  
      default:
        return state;
    }
  }
  
  export default transaction;