import {
    LOGIN_RIDER, LOGOUT_RIDER, ENTER_PICKUP, ENTER_DROPOFF, CHANGE_DISTANCE
  } from '../constants/actionConstants';
  

  const initialState = {

    walletAddress: null,
    pickup: null,
    dropoff: null,
    distance: 0
  };
  
  const riderReducer = (state = initialState, action) => {
    switch (action.type) {
      
      case LOGIN_RIDER:
        return {
          ...state,
          walletAddress: action.payload
        };
      case LOGOUT_RIDER:
        return {
          ...state,
          walletAddress: null
        };

      case ENTER_PICKUP:
        return {
            ...state,
            pickup: action.payload
        };
  
      case ENTER_DROPOFF:
        return {
            ...state,
            dropoff: action.payload
        }

      case CHANGE_DISTANCE:
        return {
            ...state,
            distance: action.payload
        }

      default:
        return state;
    }
  };
  
  export default riderReducer;
  