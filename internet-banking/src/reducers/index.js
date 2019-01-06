import { combineReducers } from 'redux';
import clients from './clients';
import payment from './payment';
import auth from './auth';
import histories from './historyTransaction';

const reducers = combineReducers({
  auth,
  clients,
  histories,
  payment
});

export default reducers;