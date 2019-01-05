import { combineReducers } from 'redux';
import clients from './clients';
import histories from './historyTransaction';

const reducers = combineReducers({
  clients, histories
});

export default reducers;