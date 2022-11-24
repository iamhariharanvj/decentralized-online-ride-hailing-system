import React from 'react'
import { useEffect, useState } from 'react'
import { signInWithGoogle } from '../services/firebase'
import * as Actions from '../redux/actions/DriverActions';
import { useSelector,useDispatch } from 'react-redux';
import Axios from 'axios';
import DriverSignUp from '../components/DriverSignUp';
import Core from './Chat/Core';

const Driver = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [hasAccount, sethasAccount] = useState(false);
    
    const dispatch = useDispatch();
    const driver = useSelector(state=>state.driver);

    useEffect(() => {
        if(hasAccount){
            const response = Axios.get(`http://localhost:4000/getUser/${localStorage.getItem('email')}`).then(response => {
                dispatch(Actions.login_driver(response.data));
                
            });   
            
            }
    },[hasAccount]);

    useEffect(()=>{
        if(isLoggedIn){
            const response = Axios.get(`http://localhost:4000/findUser/${localStorage.getItem('email')}`).then(response => sethasAccount(response.data));   
        
        }
        else{
            sethasAccount(false);
        }
    }, [isLoggedIn])
    
    useEffect(()=>{
        const name = localStorage.getItem('name')  
        const email = localStorage.getItem('email')  
        const profilePic = localStorage.getItem('profilePic')

        if(name && email && profilePic){
            const user = {
                name: name,
                email: email,
                profilePic: profilePic
            }
            dispatch(Actions.login_driver(user));

            setIsLoggedIn(true);
        }
        else{
            setIsLoggedIn(false);
            dispatch(Actions.logout_driver());
        }
    

    },[isLoggedIn])


    const logout = () => {
        console.log("WORKING")
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('profilePic');
        setIsLoggedIn(false);
    }

    const login = async () => {
        await signInWithGoogle();
        setIsLoggedIn(true);
    }

    const [getRides, setGetRides] = useState([]);

    useEffect(()=>{
        console.log(getRides);
    },[getRides]);

    const ListRides = ()=>{
        Axios.get('http://localhost:4000/getRides').
        then(response =>{
            if(response.status == 200){
                setGetRides(response.data);
            }
        })
    }
    const bid = (e,ride) => {

     const bidAmount = e.target.parentNode.childNodes[1].value;
     const bid ={
        walletAddress : ride.walletAddress,
        pickupLongitude : ride.pickupLongitude,
        pickupLatitude : ride.pickupLatitude,
        dropOffLongitude : ride.dropOffLongitude,
        dropOffLatitude : ride.dropOffLatitude,
        driverName : driver.user.name,
        driverPhone : driver.user.mobileNo,
        bidAmount : bidAmount,
        isAssigned : ride.isAssigned,
       }

       Axios.post('http://localhost:4000/bid', bid)
       .then(response => {

        console.log(response.data);

       })
     

    }

  return (
    <div>
      {isLoggedIn ? <button className="bg-red-600 text-white p-2 rounded" onClick={()=>logout()}>Log out</button> : <button className="bg-blue-600 text-white p-2 rounded" onClick={()=>login()}>Sign In with Google</button>}
      {isLoggedIn ? hasAccount ? <Core />:<DriverSignUp />: null}

        <button onClick={()=>ListRides()}>Refresh</button>


        {getRides.map((ride)=>
        <div>
            <h5>Wallet Address: {ride.walletAddress}</h5>
            <input type="text" placeholder="Set Bid"  />
            <button onClick={(e)=>bid(e,ride)}>Bid</button>
        </div>
        )}


    </div>
  )
}

export default Driver