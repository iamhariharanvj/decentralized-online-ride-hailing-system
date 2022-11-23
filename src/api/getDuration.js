export const getDuration = async (pickupCoordinates, dropoffCoordinates) => {
    const pickup = `${pickupCoordinates[0]},${pickupCoordinates[1]}`
    const dropOff = `${dropoffCoordinates[0]},${dropoffCoordinates[1]}`
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates};${dropoffCoordinates}.json?access_token=pk.eyJ1IjoiaGFyaWhhcmFudmoiLCJhIjoiY2xhc3JsdjFuMDB1bTNwczU0a2V2YnJ1aiJ9.EXytQKrWh6c9yvMv7rA_0g`
  
    try {
      const response = await fetch(url)
      const data = await response.json()
  
      return { status:200, message: 'success', data: data.routes[0] }
    } catch (error) {
      return {status:500, message: 'error', data: error.message }
    }
  }
  
  export const getDistance = async (pickupCoordinates, dropoffCoordinates) => {
    const pickup = `${pickupCoordinates[0]},${pickupCoordinates[1]}`
    const dropOff = `${dropoffCoordinates[0]},${dropoffCoordinates[1]}`
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${pickupCoordinates};${dropoffCoordinates}.json?access_token=pk.eyJ1IjoiaGFyaWhhcmFudmoiLCJhIjoiY2xhc3JsdjFuMDB1bTNwczU0a2V2YnJ1aiJ9.EXytQKrWh6c9yvMv7rA_0g`
  
    try {
      const response = await fetch(url)
      const data = await response.json()
  
      return { status:200, message: 'success', data: data.routes[0] }
    } catch (error) {
      return {status:500, message: 'error', data: error.message }
    }
  }
  
  