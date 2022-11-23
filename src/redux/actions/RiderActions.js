import {LOGIN_RIDER,LOGOUT_RIDER, ENTER_PICKUP, ENTER_DROPOFF, CHANGE_DISTANCE} from '../constants/actionConstants'


export const login_rider = (walletAddress)=>({
    type: LOGIN_RIDER,
    payload: walletAddress

});

export const logout_rider = ()=>({
    type: LOGOUT_RIDER,
    payload: null
})

export const update_pickup = (coordinates)=>({
    type: ENTER_PICKUP,
    payload: coordinates
});

export const update_dropoff = (coordinates)=>({
    type: ENTER_DROPOFF,
    payload: coordinates
});

export const change_distance =(distance)=>({
    type: CHANGE_DISTANCE,
    payload: distance
})