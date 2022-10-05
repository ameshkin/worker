import * as FirebaseModule from 'firebase';
import 'firebase/firestore';
import firebaseConfig from '../constants/firebase';

// import * as FirebaseAdmin from 'firebase-admin';  // not needed

const {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId,
} = firebaseConfig;

let firebaseInitialized = false;

if (
  apiKey !== 'null'
  && authDomain !== 'null'
  && databaseURL !== 'null'
  && storageBucket !== 'null'
  && messagingSenderId !== 'null'
) {
  FirebaseModule.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
  });

  firebaseInitialized = true;
}

/*
 var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);
 */

/*
let firebaseAdminInitialized = false;

if (
  apiKey !== 'null'
  && authDomain !== 'null'
  && databaseURL !== 'null'
  && storageBucket !== 'null'
  && messagingSenderId !== 'null'
) {
  FirebaseAdmin.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
    messagingSenderId,
  });

  firebaseAdminInitialized = true;
}
*/

export const FirebaseFirestore = firebaseInitialized ? FirebaseModule.firestore() : null;
export const FirebaseRef = firebaseInitialized ? FirebaseModule.database().ref() : null;
export const Firebase = firebaseInitialized ? FirebaseModule : null;

/*
FirebaseModule.firestore is not a function. (In 'FirebaseModule.firestore()', 'FirebaseModule.firestore' is undefined)

<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:149565:101
loadModuleImplementation
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:111:14
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:149365:27
loadModuleImplementation
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:111:14
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:149234:28
loadModuleImplementation
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:111:14
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:148859:35
loadModuleImplementation
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:111:14
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:94686:24
loadModuleImplementation
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:111:14
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:94636:24
loadModuleImplementation
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:111:14
<unknown>
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:1218:22
loadModuleImplementation
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:111:14
guardedLoadModule
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:49:47
global code
    AppEntry.bundle?platform=ios&dev=false&minify=false&hot=false&assetPlugin=%2FUsers%2Famirmeshkin%2F_sites%2Fapps%2Ftrabajamos4%2Fnode_modules%2Fexpo%2Ftools%2FhashAssetFiles:223365:8

 */
