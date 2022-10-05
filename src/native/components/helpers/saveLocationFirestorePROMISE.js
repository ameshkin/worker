import core from "../../constants/core"
import { mergeWorkerAsyncStorage } from "./mergeWorkerAsyncStorage"

export const saveLocationFirestore = (uid, postdata) => {
  return  new Promise(function (resolve, reject) {

    let json = `
     {
	"workers": {
		"key": "${uid}",
		"data": {
			"location": {
				"city": "${postdata.city}",
				"county": "${postdata.county}",
				"state": "${postdata.state}",
				"country": "${postdata.country}",
				"latitude": ${postdata.latitude},
				"longitude": ${postdata.longitude}
			}
		}
	}
}`


    let url = `${core.web_service}api/worker/savelocation`
    let fetchData = {
      method: 'POST',
      // body: JSON.stringify( postdata ),
      body:  json,  // unsupported BodyInit type
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }

    fetch(url, fetchData)

      .then((resp) => resp.json())  // returns just the JSON from request
      .then((response) => {
        // Handle response you get from the server
        console.log("saveLocationFirestore response: ",response);
        //TODO: save to asyncstorage

        /*
        undefined is not an object (near '...}).catch(function (err...')

         */


        return response;

      })

      .then ((json) => {
        // TODO: FIXME: this should not be here, but this is the only way it fucking works!
        console.log("mergeWorkerAsyncStorage running: ",json);
        return mergeWorkerAsyncStorage( json )

      })

      .catch((err) => {
        console.log("saveLocationFirestore catch in function: ");
        console.log(err.message);
      })
      .done((response) => {

        console.log("done with SetLocation: ", response);
        return response;
      });
  });
}
