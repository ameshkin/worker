import core from '../../constants/core'

// TODO: FIXME: NOT USING THIS BECAUSE OF ASYNC HELL
// gets a list of worekers from firestore
// export const getWorkersFromFirestore = async (location, filter, type, catId) => {
export const getWorkersFromFirestore = async (inputs) => {

  let { location, filter, type, catId } = inputs

  try {
    console.log("helper function getWorkersFromFirestore: ", location);


    // const url = `https://trabajamos.herokuapp.com/api/worker/${ type }/${ catId }/${ filter }`;

    const url = `${ core.web_service }api/worker/${ type }/${ catId }/${ filter }`;

    console.log("getWorkersFromFirestore url: ", url);
    let fetchData = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }
    fetch(url, fetchData)

      .then((resp) => resp.json())  // returns just the JSON from request
      .then((response) => {

        // console.log("returning response from getWorkersFromFirestore: ",response);

        return response;
        //

      })
      .catch((err) => {
        console.log("37 catch getWorkersFromFirestore geocode error: ", err);
      })
      .done((response) => {
        // console.log("41 done getWorkersFromFirestore geocode error: ", response);

        return response;

      });
  } catch (error) {
    // Error retrieving data
    console.log(error.message);
  }

};
