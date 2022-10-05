import { Firebase, FirebaseRef } from '../lib/firebase';


/**
 * TODO: pass entire item to worker detail page
 */
export function getWorkerDetailAction( ) {

  if (Firebase === null) return () => new Promise(resolve => resolve());

  console.log("getWorkerDetailAction in actions/workers");
  return dispatch => new Promise(resolve => FirebaseRef.child('workers')
    .child(1)
    .on('value', (snapshot) => {
      const recipes = snapshot.val() || {};

      return resolve(dispatch({
        type: 'GET_WORKER_DETAIL',
        data: recipes,
      }));
    })).catch(e => console.log(e));

}

// TODO: action for getting a user location
export function getUserLocationAction(message) {
  console.log("setError: ", message);



  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'GET_USER_LOCATION',
    data: message,
  })));
}


/**
 * Set an Error Message
 */
export function setError(message) {
  console.log("setError: ", message);
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}
