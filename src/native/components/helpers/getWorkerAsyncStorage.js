import { AsyncStorage } from "react-native"

// GET worker data in async storage!
// no input data should be needed
// export const getWorkerAsyncStorage = async worker => {
export const getWorkerAsyncStorage =  async () => {
  try {
    console.log("helper function getWorkerAsyncStorage: ");
    let get = await AsyncStorage.getItem('worker')
      .catch((error) => {
        console.log("getWorkerAsyncStorage internal catch: ", error);
      })
      .done((results) => {
        console.log("getWorkerAsyncStorage done: ", results);
      });

    // console.log("helper function ASDFAS DF ASDFA SDFGSA: ", JSON.parse(get));
    // turn into object here!

    console.log("get: ", get);

    // TODO: catch errors better!!!

    if (get) {

      return JSON.parse(get);
    } else {

      return {
        error: 1,
        location: {
          "county": "Wilson",
          "city": "Nashville",
          "latitude": 36.1627,
          "state": "TN",
          "longitude": -86.7816,
          "country": "USA"
        }
      }

    }

  } catch (error) {
    console.log("getWorkerAsyncStorage try catch: ", error);
    // console.log(error.message);
  }
};


/*
export const getWorkerAsyncStorage =  async () => {

  return {
    location: {
      "county": "Wilson",
      "city": "Nashville",
      "latitude": 36.1627,
      "state": "TN",
      "longitude": -86.7816,
      "country": "USA"
    }
  }
};
*/
