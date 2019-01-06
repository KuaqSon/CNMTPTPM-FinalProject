import { combineReducers } from 'redux';
import clients from './clients';
import payment from './payment';
import auth from './auth';

const reducers = combineReducers({
  auth,
  clients,
  payment
});

export default reducers;