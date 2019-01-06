import { combineReducers } from 'redux';
import clients from './clients';
import payment from './payment';
import auth from './auth';
import histories from './historyTransaction';
import recipient from './recipient';

const reducers = combineReducers({
  auth,
  clients,
  histories,
  payment,
  recipient
});

export default reducers;