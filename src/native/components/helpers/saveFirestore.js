import {Firebase, FirebaseFirestore} from "../../../lib/firebase"

// take any shaped data, merge it into firebase collection
export const saveFirestore = async (collection, data) => {

  if (Firebase === null) return () => new Promise(resolve => resolve());

  // const UID = 'ameshkin2'
  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  var setDoc = FirebaseFirestore.collection(collection).doc(UID);

  console.log("saveWorkerFirestoreInitial UID: ",  UID);
  try {
    // let results = await setDoc.set({data}, { merge: true });  // {} will put data in as an element
    let results = await setDoc.set(data, { merge: true });
    console.log("saveWorkerFirestoreInitial results: ",  results);

    return results;


  } catch (error) {
    console.error(error);
  }

};
