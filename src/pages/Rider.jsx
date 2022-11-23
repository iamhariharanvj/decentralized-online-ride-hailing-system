import {useState} from 'react';

const Rider = () => {

  const [btnText, setBtnText] = useState("Connect Wallet");

  const connectWallet = () => {

    window.ethereum.request({method:'eth_requestAccounts'})
    .then(walletAddress=>{
      setBtnText(walletAddress);
    })
  
  }


  return (
    <div>
      <button onClick={()=>connectWallet()} className='px-4 py-2 bg-purple-800 text-white rounded-2xl shadow-lg hover:bg-purple-700'>{btnText}</button>


    </div>
  )
}

export default Rider