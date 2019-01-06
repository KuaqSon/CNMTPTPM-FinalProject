import {
    TRANSACTION_SEND_CARD,
    TRANSACTION_RECIPIENT_CARD,
    TRANSACTION_INFO,
    TRANSACTION_PAYER,
  } from  '../actions/transaction';
  
  const initialState = {
    data: [],
    status: false,
    sendCard: '',
    recipientCard: '',
    infor: '',
    payer: false,
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

      case TRANSACTION_INFO: 
        return {
          ...state,
          infor: action.data
        }
      
      case TRANSACTION_PAYER:
        return {
          ...state,
          payer: action.data
        }
  
      default:
        return state;
    }
  }
  
  export default transaction;