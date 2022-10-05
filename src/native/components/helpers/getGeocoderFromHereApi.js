import core from "../../constants/core"

// GET worker data in async storage!
export const getGeocoderFromHereApi = async (city, state, country) => {


  // TODO: add proper validation

  let query = encodeURI(`${city}, ${state} ${country}`);

  let url = `https://geocoder.api.here.com/6.2/geocode.json?app_id=${core.app_id}&app_code=${core.app_code}&searchtext=` + query
  console.log("url: ", url);
  let fetchData = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  }
  try {
    console.log("getGeocoderFromHereApi url: ", url);
    let get = await fetch(url, fetchData)
      // .then((resp) => resp.json())
      .catch((err) => {
        console.log("getGeocoderFromHereApi catch err: ",err);

      });
    return get;

  } catch (error) {
    console.log(error.message);
  }
};
