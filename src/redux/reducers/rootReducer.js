import { combineReducers } from 'redux';
import riderReducer from './riderReducer';

const rootReducer = combineReducers({
  rider: riderReducer
});

export default rootReducer;
