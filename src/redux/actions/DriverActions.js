import {LOGIN_DRIVER,LOGOUT_DRIVER} from '../constants/actionConstants'

export const login_driver = (user)=>({
    type: LOGIN_DRIVER,
    payload: user

});

export const logout_driver = ()=>({
    type: LOGOUT_DRIVER,
    payload: null
});