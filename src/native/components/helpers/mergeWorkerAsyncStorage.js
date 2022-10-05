import {AsyncStorage} from "react-native"

// save worker data in async storage AND MERGE WITH EXISTING DATA
export const mergeWorkerAsyncStorage = async worker => {

  try {
    // console.log("helper function mergeWorkerAsyncStorage: ", worker);
    let set = await AsyncStorage.mergeItem('worker', JSON.stringify(worker))
      .catch((err) => {
        console.log(err);

      });
    return set;

  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};
