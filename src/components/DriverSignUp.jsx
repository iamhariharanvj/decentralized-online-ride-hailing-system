import {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import Axios from 'axios';
import * as Actions from '../redux/actions/DriverActions';
const DriverSignUp = () => {

    const driver = useSelector(state=>state.driver.user);
    const dispatch = useDispatch();
    const [vehicleNo, setVehicleNo] = useState("");
    const [mobileNo, setMobileNo] = useState("");
    const [aadharNo, setAadharNo] = useState("");

    const createAccount = async() => {
        const user = {};

        user.name = driver.name;
        user.email = driver.email;
        user.profilePic = driver.profilePic;
        user.aadharNo = aadharNo;
        user.vehicleNo = vehicleNo;
        user.mobileNo = mobileNo;

        const data = JSON.stringify(user);
        const options = {
        headers: {"content-type": "application/json"}
        }
        console.log(user);
        await Axios.post("http://localhost:4000/createAccount", data,options)
        .then(response => {
            if(response.data != null){
                dispatch(Actions.login_driver(response.data));
            }
            window.location.reload();
            })
        .catch(err => {console.log(err.message)});

    }

    // rides - wallet id, pickup drop isassigned landmark

    // request - driver name, driver phone no, bidded price, 


    return (
    <div>
        <h3>Sign Up</h3>
        <input type="text" value={vehicleNo} onChange={(e)=>setVehicleNo(e.target.value)} placeholder="Enter your vehicle number" />
        <br />
        <input type="text" value={mobileNo} onChange={(e)=>setMobileNo(e.target.value)} placeholder="Enter your mobile number" />
        <br />
        <input type="text" value={aadharNo} onChange={(e)=>setAadharNo(e.target.value)} placeholder="Enter your aadhar number" />
        <br />
        <button onClick={()=>createAccount()}>Submit</button>



    </div>
  )
}

export default DriverSignUp