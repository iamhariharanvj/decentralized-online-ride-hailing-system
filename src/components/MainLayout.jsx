import {useState, useEffect} from 'react'
import {getDistance, getDuration} from '../api/getDuration';
import { useDispatch , useSelector} from 'react-redux'
import { getLocationCoordinates } from '../api/getLocationCoordinates'
import * as Actions from '../redux/actions/RiderActions'
const MainLayout = () => {

  const dispatch = useDispatch();
  const [pickup, setPickup] = useState(null);
  const [dropoff, setDropoff] = useState(null);

  const updateMap = async()=>{
      var coordinates = await getLocationCoordinates(pickup);
    var drop = await getLocationCoordinates(dropoff);

    coordinates = coordinates.data;
    drop = drop.data;

    if(coordinates!=null) {
      await dispatch(Actions.update_pickup(coordinates)); 
    }

    console.log(coordinates, drop);

    if(drop!=null) {
      await dispatch(Actions.update_dropoff(drop)); 
    }

    }

  return (
    <div>
        <input type="text" onChange={(e)=>setPickup(e.target.value)} placeholder="Enter Pick Location" />
        <br />
        <input type="text" onChange={(e)=>setDropoff(e.target.value)} placeholder="Enter DropOff Location" />
        <button onClick={(e)=>updateMap()}>Find Routes</button>
    </div>
  )
}

export default MainLayout