import { combineReducers } from 'redux';
import clients from './clients';

const reducers = combineReducers({
  clients,
});

export default reducers;