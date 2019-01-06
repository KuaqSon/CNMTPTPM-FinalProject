import {
    TRANSACTION_SEND_CARD,
    TRANSACTION_RECIPIENT_CARD,
  } from  '../actions/transaction';
  
  const initialState = {
    data: [],
    status: false,
    sendCard: '',
    recipientCard: ''
  };
  
  const transaction = (state = initialState, action) => {
    switch (action.type) {
      case TRANSACTION_SEND_CARD: 
        return {
          ...state,
          sendCard: action.data
        }

      case TRANSACTION_RECIPIENT_CARD: 
      return {
        ...state,
        recipientCard: action.data
      }
  
      default:
        return state;
    }
  }
  
  export default transaction;