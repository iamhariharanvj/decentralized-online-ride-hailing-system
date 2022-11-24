import { combineReducers } from 'redux';
import riderReducer from './riderReducer';
import driverReducer from './driverReducer';

const rootReducer = combineReducers({
  rider: riderReducer,
  driver: driverReducer
});

export default rootReducer;
