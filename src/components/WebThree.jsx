import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import * as Actions from '../redux/actions/RiderActions';

const ConnectWallet = () => {

    const rider = useSelector(state => state.rider);
    const dispatch = useDispatch();

    const [btnText, setBtnText] = useState("Connect Wallet");
  
    const connectWallet = async() => {

      if(rider.walletAddress == null){

        await window.ethereum.request({method:'eth_requestAccounts'})
        .then(async walletAddress=>{
            dispatch(Actions.login_rider(walletAddress[0]));            
        })
        
        
        setBtnText("Connected");

      } 
      else{
        dispatch(Actions.logout_rider())
        setBtnText("Connect to Wallet");
      
    }
      
    console.log(rider.walletAddress);

      
    }
  
    return (
      <div>
      <h1>{rider.walletAddress != null ? 'Wallet Addres' : 'Login to Continue'}</h1>

        <button onClick={()=>connectWallet()} className='px-4 py-2 bg-purple-800 text-white rounded-2xl shadow-lg hover:bg-purple-700'>{btnText}</button>
  
      </div>
    )
}

export default ConnectWallet