import ConnectWallet from '../components/WebThree';
import Map from '../components/Map';
import MainLayout from '../components/MainLayout';
import { useState } from 'react';
import { useSelector } from 'react-redux'
import {ethers} from 'ethers'
import Axios from 'axios';
import RiderForm from '../pages/Chat/RiderForm';
const Rider = ()=>{

  const [bids, setBids] = useState([]);
  const rider = useSelector(state => state.rider);
  const getBids = async () => {
    await Axios.get(`http://localhost:4000/getBids/${rider.walletAddress}`)
    .then(response=>{
      if(response.status === 200) {
        setBids(response.data);
      }
    })
  }

  
  const Pay = async (bid)=>{
    await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [
        {
          from: bid.walletAddress,
          to: bid.walletAddress,
          gas: '0x7EF40', // 520000 Gwei
          value: ethers.utils.parseEther(bid.bidAmount)._hex,
        },
      ],
    })
  }
  return (
    <div>
      <ConnectWallet />
      <MainLayout />
      <button onClick={()=>getBids()}>Refresh</button>
      {bids.map((bid)=><div>
        <h1>Name {bid.driverName}</h1>
        <h1>Phone {bid.driverPhone}</h1>
        <h1>Bid Price {bid.bidAmount}</h1>
        <button onClick={()=>Pay(bid)}>Accept Bid</button>


      </div>)}

      <RiderForm />
      <Map />
      
    </div>
  );
}

export default Rider