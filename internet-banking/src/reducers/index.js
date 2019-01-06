import { combineReducers } from 'redux';
import clients from './clients';
import payment from './payment';
import auth from './auth';
import histories from './historyTransaction';
import recipient from './recipient';
import transaction from './transaction';

const reducers = combineReducers({
  auth,
  clients,
  histories,
  payment,
  recipient,
  transaction
});

export default reducers;