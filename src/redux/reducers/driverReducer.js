import {
    LOGIN_DRIVER, LOGOUT_DRIVER
  } from '../constants/actionConstants';
  

  const initialState = {
    user: null,
  };
  
  const riderReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case LOGIN_DRIVER:
        return {
          ...state,
          user: {...state.user, ...action.payload}
        };

      case LOGOUT_DRIVER:
        return {
          ...state,
          user: null
        };

      default:
        return state;
    }
  };
  
  export default riderReducer;
  