import core from "../../constants/core"
import { mergeWorkerAsyncStorage } from "./mergeWorkerAsyncStorage"

// TODO: ONE AND ONLY FUNCTION FOR SAVING DATA TO THE WORKER TABLE
export const saveWorkerFirestore = (uid, data) => {
  return  new Promise(function (resolve, reject) {


    let json = `
 {
 	"workers": {
 		"key": "${uid}",
 		"data": {
 			"displayName": "${data.displayName}",
 			"email": "${data.email}",
 			"subtitle": "${data.subtitle}",
 			"moreinfo": "${data.moreinfo}",
 			"status": "${data.status}",
 			"isworker": "${data.isworker}"
 		}
 	}
 }`

    /*
              displayName: value.displayName,
          email: value.email,
          subtitle: value.subtitle,
          moreinfo: value.moreinfo,
          status: value.status,
          isworker: value.isworker,
     */




    console.log("saveWorker data: ", data);


    let url = `${core.web_service}api/worker/save`
    let fetchData = {
      method: 'POST',
      //body: JSON.parse(json), // saveWorker catch in function:
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
        console.log("saveWorker response: ",response);
        //TODO: save to asyncstorage

        /*
        undefined is not an object (near '...}).catch(function (err...')

         */


        return response;

      })
      /*
      .then ((json) => {
        // TODO: FIXME: this should not be here, but this is the only way it fucking works!
        // console.log("mergeWorkerAsyncStorage running: ",json.data);
        return mergeWorkerAsyncStorage( json.data )  // by looking at data, we exclude the KEY from data structure.

      })
      */
      .catch((err) => {
        console.log("saveWorker catch in function: ");
        console.log(err.message);
      })
      .done(() => {


        let finished = { "done": 1 }
        console.log("done with saveWorkerFirestore: ", finished);
        return finished;
      }) ;
  });
}

// .resolve()  // helps take this to next page
