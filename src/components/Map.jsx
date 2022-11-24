import { useEffect, useRef} from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'; 
import { useSelector ,useDispatch} from 'react-redux';
import * as Actions from '../redux/actions/RiderActions';
mapboxgl.accessToken = "pk.eyJ1IjoiaGFyaWhhcmFudmoiLCJhIjoiY2xhc3JsdjFuMDB1bTNwczU0a2V2YnJ1aiJ9.EXytQKrWh6c9yvMv7rA_0g"

const style = {
    wrapper: `w-screen h-screen absolute`,
}

const Map = () => {

  const pickupCoordinates = useSelector(state=>state.rider.pickup);
  const dropoffCoordinates = useSelector(state=>state.rider.dropoff);
  var map = null;
  const dispatch = useDispatch();
  useEffect(() => {
    if(map){return;}

    map = new mapboxgl.Map({
      container: 'mapbox',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [60,50],
      zoom: 3,
    },[pickupCoordinates, dropoffCoordinates])


    if (pickupCoordinates) {
      const marker = addToMap(map, pickupCoordinates)
      marker.on('dragend', ()=>{dispatch(Actions.update_pickup([marker.getLngLat().lng, marker.getLngLat().lat]))});
    }

    if (dropoffCoordinates) {
      const marker = addToMap(map, dropoffCoordinates)
      marker.on('dragend', ()=>{dispatch(Actions.update_dropoff([marker.getLngLat().lng, marker.getLngLat().lat]))});
      
    }

    if (pickupCoordinates && dropoffCoordinates) {
        map.fitBounds([dropoffCoordinates, pickupCoordinates], {
          padding: 200,
        })

        
    }

    
  }, [pickupCoordinates, dropoffCoordinates])

  const addToMap = (map, coordinates) => {
    const marker1 = new mapboxgl.Marker({color: "#FF0000", draggable: true}).setLngLat(coordinates).addTo(map)
    return marker1;    
}

  return <div className='h-screen w-screen absolute' id='mapbox' ></div>
}

export default Map
