import ErrorMessages from '../constants/errors';
import statusMessage from './status';
import { Firebase, FirebaseRef } from '../lib/firebase';
// import { Actions } from 'react-native-router-flux'
import { saveWorkerFirestore } from "../native/components/helpers/saveWorkerFirestore"
import {saveFirestore} from "../native/components/helpers/saveFirestore"
import {Actions} from "react-native-router-flux"

/**
 * Register to Firebase
 * TODO: no longer being used
 */
export function signUpOriginal(formData) {
  const {
    email,
    password,
    password2,
    fullName,
    username,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!fullName) return reject({ message: ErrorMessages.missingFullName });
    if (!username) return reject({ message: ErrorMessages.missingUsername });
    if (!phone) return reject({ message: ErrorMessages.missingPhone });
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });
    if (!password2) return reject({ message: ErrorMessages.missingPassword });
    if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        // Send user details to Firebase database
        if (res && res.uid) {
          FirebaseRef.child(`users/${res.uid}`).set({
            fullName,
            username,
            phone,
            signedUp: Firebase.database.ServerValue.TIMESTAMP,
            lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
          }).then(() => statusMessage(dispatch, 'loading', false).then(resolve));
        }
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
 * Register to Firebase using new Method
 * TODO: send to Home page
 */
// export function signUp(formData) {
export function welcome() {
  /*
  const {
    email,
    password,
    password2,
    fullName,
    username,
  } = formData;

*/
  console.log("action/member.js ");

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);


    await statusMessage(dispatch, 'loading', false);

    // Send Login data to Redux
    return resolve(dispatch({
      type: 'USER_SIGNUP',
      // data: userDetails,
    }))
      .catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });



  });
}

/**
 * Get this User's Details
 * TODO: also get the locale and location and put it into persist:store
 */
function getUserData(dispatch) {
  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;

  if (!UID) return false;

  const ref = FirebaseRef.child(`workers/${UID}`);
  // const ref = FirebaseRef.child(`users/${UID}`);

  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];

    console.log("getUserData userData: ", getUserData);

    return dispatch({
      type: 'USER_DETAILS_UPDATE',
      data: userData,
    });
  });
}

export function getMemberData() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  // Ensure token is up to date
  return dispatch => new Promise((resolve) => {
    Firebase.auth().onAuthStateChanged((loggedIn) => {
      if (loggedIn) {
        return resolve(getUserData(dispatch));
      }

      return () => new Promise(() => resolve());
    });
  });
}

/**
 * Login to Firebase with Email/Password
 */
export function login(formData) {
  const {
    email,
    password,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    // Go to Firebase
    return Firebase.auth()
      .setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
      .then(() => Firebase.auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          const userDetails = res && res.user ? res.user : null;

          if (userDetails.uid) {
            // Update last logged in data
            FirebaseRef.child(`users/${userDetails.uid}`).update({
              lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
            });

            // Send verification Email when email hasn't been verified
            if (userDetails.emailVerified === false) {
              Firebase.auth().currentUser
                .sendEmailVerification()
                .catch(() => console.log('Verification email failed to send'));
            }
          }

          return userDetails;
        })
        .then(async (userDetails) => {

          // TODO: need to also get location data from worker table but have failed!

          await statusMessage(dispatch, 'loading', false);

          //  undefined is not a function (near '...getUserData(dispatch).then...')
          // get extra user data from workers table

          /*
          getUserData()
            .then((results) => {

              // Send Login data to Redux
              return resolve(dispatch({
                type: 'USER_LOGIN',
                data: userDetails,
                extra: results,
              }));


            })
            .catch((err) => {
              console.log(`catwadsfasfd 190: ${err}`);
            });

            */


          const ref = FirebaseRef.child(`workers/${userDetails.uid}`);
          // const ref = FirebaseRef.child(`users/${UID}`);

          ref.on('value', (snapshot) => {
            const moreDetails = snapshot.val() || [];

            console.log("getUserData snapshot: ", moreDetails.data());


            return resolve(dispatch({
              type: 'USER_LOGIN',
              data: userDetails,
              // extra: moreDetails.data(),
            }));
          });


        })
        .catch(reject));
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
 * Reset Password
 */
export function resetPassword(formData) {
  const { email } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return Firebase.auth()
      .sendPasswordResetEmail(email)
      .then(() => statusMessage(dispatch, 'loading', false).then(resolve(dispatch({ type: 'USER_RESET' }))))
      .catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
 * Update Profile
 */
export function updateProfile(formData) {
  const {
    email,
    password,
    password2,
    fullName,
    username,
    phone,
    changeEmail,
    changePassword,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {
    // Are they a user?
    const UID = Firebase.auth().currentUser.uid;
    if (!UID) return reject({ message: ErrorMessages.missingFullName });

    // Validation checks
    if (!fullName) return reject({ message: ErrorMessages.missingFullName });
    if (!username) return reject({ message: ErrorMessages.missingUsername });
    if (changeEmail) {
      if (!email) return reject({ message: ErrorMessages.missingEmail });
    }
    if (changePassword) {
      if (!password) return reject({ message: ErrorMessages.missingPassword });
      if (!password2) return reject({ message: ErrorMessages.missingPassword });
      if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });
    }

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return FirebaseRef.child(`users/${UID}`).update({ fullName, username, phone })
      .then(async () => {
        // Update Email address
        if (changeEmail) {
          await Firebase.auth().currentUser.updateEmail(email).catch(reject);
        }

        // Change the password
        if (changePassword) {
          await Firebase.auth().currentUser.updatePassword(password).catch(reject);
        }

        // Update Redux
        await getUserData(dispatch);
        await statusMessage(dispatch, 'success', 'Profile Updated');
        resolve();
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/**
 * Logout
 * TODO: send to home page, not back to profile page which is confusing!
 */
export function logout() {

  console.log("logging out")
  return dispatch => new Promise((resolve, reject) => {
    Firebase.auth().signOut()
      .then(() => {
        // dispatch({ type: 'USER_RESET' });
        dispatch({ type: 'USER_RESET' });
        setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}

/*
console.error: "[2018-10-09T04:11:37.251Z]  @firebase/firestore:", "Firestore (5.5.0): Could not reach Cloud Firestore backend. Backend didn't respond within 10 seconds.
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend."

__expoConsoleLog
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:36773:38
defaultLogHandler
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:173752:36
error
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:173844:35
error
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:177357:34
logClientOfflineWarningIfNecessary
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:190189:22
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:190142:61
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:186509:36
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:186546:26
tryCallOne
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:3256:16
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:3357:27
_callTimer
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2686:17
_callImmediatesPass
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2714:19
callImmediates
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2921:33
__callImmediates
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2420:32
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2300:34
__guardSafe
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2404:13
flushedQueue
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:2299:21

 */

/**
 * USer Dashboard
 * TODO: WILL NOT GO TO NEXT FUCKING PAGE NEVER GOES TO REDUCER
 * create action for a userdashboard page
 */
// export function dashboarduser( ) {
export function dashboarduser(  ) {

  console.log("dashboarduser in actions/member.js")
  return dispatch => new Promise((resolve, reject) => {
    Firebase.auth().signOut()
      .then(() => {
        // dispatch({ type: 'USER_RESET' });
        dispatch({ type: 'USER_RESET' });
        setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });

  // Actions.jump("dashboarduser");
  // Actions.dashboarduser()

  /*
  TypeError: babelHelpers.objectDestructuringEmpty is not a function. (In 'babelHelpers.objectDestructuringEmpty(_ref)', 'babelHelpers.objectDestructuringEmpty' is undefined)

   */

  // console.log("dispatch: ", dispatch)


  // Actions.jump("dashboarduser");
  // dispatch(Actions.dashboarduser) babel errors

  /*
  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;


  console.log("UID: ", UID);

  // WORKS BUT DOES NOT CHANGE SCENE
  return dispatch => new Promise((resolve, reject) => {

    // setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message

    // dispatch(Actions.dashboarduser) babel errors

    console.log("dispatching: ", UID);


    // does nothing but passes data
    return dispatch({
      type: 'USER_DASHBOARD',
      data: {
        "uid": UID
      },
    });


  })
    .then((res) => {

      console.log("res: ", res);

    })
    .catch(async (err) => {
    await statusMessage(dispatch, 'error', err.message);

    console.log("caught in actions/member.js: ", err.message);
    throw err.message;
  });


*/

  /*
  snapshot.val is not a function. (In 'snapshot.val()', 'snapshot.val' is undefined)

  const ref = FirebaseRef.child(`users/${UID}`);

  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];

    return dispatch({
      type: 'USER_DASHBOARD',
      blah: userData,
    });
  });

  */

  /*
   undefined is not a function (near '..._firebase.FirebaseRef.child("users/" + UID).then...')


  return dispatch => new Promise((resolve, reject) => {
    FirebaseRef.child(`users/${UID}`)   // this uses realtime database but still finds the right user, returns as null!
      .then(( ref ) => {

        console.log("ref: ", ref);

        dispatch({
          type: 'USER_DASHBOARD',
          data: {
            "blah": "sdfasdf"
          },
        });

        setTimeout(resolve, 3000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });

  */

  /*

  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];

    return dispatch({
      type: 'USER_DASHBOARD',
      data: userData,
    });
  });

*/

  /*
    return dispatch => new Promise((resolve, reject) => {

      console.log("resolve: ", resolve)

      console.log("reject: ", reject)

      // dispatch({ type: 'USER_DASHBOARD' });


      return dispatch({
        type: 'USER_DASHBOARD',
      });



    })
      .catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
      */


}


/**
 * Get this User's Task History
 */
export function getUserTaskHistory(dispatch) {
  const UID = (
    FirebaseRef
    && Firebase
    && Firebase.auth()
    && Firebase.auth().currentUser
    && Firebase.auth().currentUser.uid
  ) ? Firebase.auth().currentUser.uid : null;


  console.log("UID: ", UID);

  // if (!UID) return false;

  const ref = FirebaseRef.child(`users/${UID}`);

  return ref.on('value', (snapshot) => {
    const userData = snapshot.val() || [];

    return dispatch({
      type: 'USER_TASK_HISTORY',
      data: userData,
    });
  });

}


//sign up workers
// src/native/components/pages/admin/WorkerSignUpLanguage.js
export function workersignup(formData) {
  const {
    uid,
    email,
    subtitle,
    moreinfo,
    status,
    isworker,

  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {

    /*

    // Validation checks
    if (!fullName) return reject({ message: ErrorMessages.missingFullName });
    if (!username) return reject({ message: ErrorMessages.missingUsername });
    if (!phone) return reject({ message: ErrorMessages.missingPhone });
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });
    if (!password2) return reject({ message: ErrorMessages.missingPassword });
    if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });

    */

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return saveWorkerFirestore(uid, formData)
      .then((res) => {
        // Send user details to Firebase database
        if (res && res.uid) {
          FirebaseRef.child(`users/${res.uid}`).set({
            fullName,
            username,
            phone,
            signedUp: Firebase.database.ServerValue.TIMESTAMP,
            lastLoggedIn: Firebase.database.ServerValue.TIMESTAMP,
          }).then(() => statusMessage(dispatch, 'loading', false).then(resolve));
        }
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
}



// save worker language
// src/native/components/pages/admin/WorkerSignUpLanguage.js

// TODO: return worker data
export function workersignuplanguage(formData) {
  const {
    uid,
    languages,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {

    /*

    // Validation checks
    if (!fullName) return reject({ message: ErrorMessages.missingFullName });
    if (!username) return reject({ message: ErrorMessages.missingUsername });
    if (!phone) return reject({ message: ErrorMessages.missingPhone });
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });
    if (!password2) return reject({ message: ErrorMessages.missingPassword });
    if (password !== password2) return reject({ message: ErrorMessages.passwordsDontMatch });

    */

    await statusMessage(dispatch, 'loading', true);

    // Go to Firebase
    return saveWorkerFirestore(uid, formData)
      .then((result) => {
        // Send user details to Firebase database

        console.log("workersignuplanguage dispatching to SAVE_WORKER_LANGUAGE: ", result);
        dispatch({
          type: 'SAVE_WORKER_LANGUAGE',
          data: result,
        });
        setTimeout(resolve, 1000) // Resolve after 1s so that user sees a message
      }).catch(reject);

  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });

  /*
    return dispatch => new Promise((resolve, reject) => {
    Firebase.auth().signOut()
      .then(() => {
        // dispatch({ type: 'USER_RESET' });
        dispatch({ type: 'USER_RESET' });
        setTimeout(resolve, 1000); // Resolve after 1s so that user sees a message
      }).catch(reject);
  }).catch(async (err) => { await statusMessage(dispatch, 'error', err.message); throw err.message; });
   */
}
