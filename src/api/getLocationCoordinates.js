export const getLocationCoordinates = async (query) => {

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoiaGFyaWhhcmFudmoiLCJhIjoiY2xhc3JsdjFuMDB1bTNwczU0a2V2YnJ1aiJ9.EXytQKrWh6c9yvMv7rA_0g`

    try 
    {
        const response = await fetch(url)
        const data = await response.json()
    
        return {status: 200, message: 'success', data: data.features[0].center}
    } 
    catch (error) {
        return {status:500, message: 'error', data: error.message }
    }

}