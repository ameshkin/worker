import {AsyncStorage} from "react-native"

// save worker data in async storage AND OVERWRITE WHAT IS THERE
export const saveWorkerAsyncStorage = async worker => {

  try {
    console.log("helper function setLocation: ", worker);
    let set = await AsyncStorage.setItem('worker', worker)
      .catch((err) => {
        console.log(err);

      });
    return set;

  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }
};
