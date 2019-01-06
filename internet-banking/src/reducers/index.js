import { combineReducers } from 'redux';
import clients from './clients';
import payment from './payment';

const reducers = combineReducers({
  clients,
  payment
});

export default reducers;