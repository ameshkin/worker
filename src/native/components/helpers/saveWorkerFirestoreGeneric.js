import {Firebase, FirebaseFirestore} from "../../../lib/firebase"


export const saveWorkerFirestoreGeneric = async (objname, newstate) => {

  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = 'CwUtnEXdmMhwzEd4eePlF4NpV5g2';
  // const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  var setDoc = FirebaseFirestore.collection('workers').doc(UID);

  console.log("saveWorkerFirestoreGeneric UID: ",  UID);
  try {
    let results = await setDoc.set({
      // languages: newstate
      // 'favorites.color': 'Red'
      [objname]: newstate

    }, { merge: true });

    console.log("saveWorkerFirestoreGeneric results: ",  results);

    return results;


  } catch (error) {
    console.error(error);
  }

};
