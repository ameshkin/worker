import { Firebase, FirebaseRef } from '../lib/firebase';

/**
  * Get this User's Favourite Recipes
  */
export function getFavourites(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`favourites/${UID}`);

  return ref.on('value', (snapshot) => {
    const favs = snapshot.val() || [];

    return dispatch({
      type: 'FAVOURITES_REPLACE',
      data: favs,
    });
  });
}

/**
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
  */
export function replaceFavourites(newFavourites) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  return () => FirebaseRef.child(`favourites/${UID}`).set(newFavourites);
}


/**
 * Get Categories
 */
export function getCategories() {
  console.log("getCategories in actions: ");

  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .child('categories').once('value')
    .then((snapshot) => {
      const categories = snapshot.val() || {};
      console.log("getCategories: getting them: ", getCategories);
      return resolve(dispatch({
        type: 'CATEGORIES_REPLACE',
        data: categories,
      }));
    }).catch(reject)).catch(e => console.log(e));
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

/**
  * Get Recipes
  */
export function getRecipes() {

  console.log("getRecipes in actions: ");


  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('recipes')
    .on('value', (snapshot) => {
      const recipes = snapshot.val() || {};

      return resolve(dispatch({
        type: 'RECIPES_REPLACE',
        data: recipes,
      }));
    })).catch(e => console.log(e));
}

/**
 * TODO: find out how to restrict to just certain categories

 * Get Recipes by category
 */

/* broken
export function getRecipesByCategory(category) {

  console.log("getRecipesByCategory in actions: " + category);


  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('recipes')
    .child(category)
    .on('value', (snapshot) => {
      const recipes = snapshot.val() || {};

      return resolve(dispatch({
        type: 'SHOW_WORKERS_BY_CATEGORY',
        data: recipes,
      }));
    })).catch(e => console.log(e));
}
*/

/**
 * TODO: cannot pass category here
 */
export function getRecipesByCategory(category) {


  console.log("getRecipesByCategory in actions: ", category);


  return () => new Promise(resolve => resolve());

  /*

  // causing this error
  [Error: Reference.child failed: First argument was an invalid path = "undefined". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"]
  console.log("getRecipesByCategory in actions: ");
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('workers')
    .child(category)
    .on('value', (snapshot) => {
      const recipes = snapshot.val() || {};

      return resolve(dispatch({
        type: 'RECIPES_REPLACE_BY_CATEGORY',
        data: recipes,
      }));
    })).catch(e => console.log(e));
    */

}


/**
 * TODO: pass entire item to worker detail page
 */
export function getWorkerDetailAction( ) {

  if (Firebase === null) return () => new Promise(resolve => resolve());

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


/**
 * TODO:  but this is the one it should be used for fetchMeals

export function getTrabajamos( category ) {

  console.log("getTrabajamos in actions: ",category);

  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .child('trabajamos')
    .once('value')
    .then((snapshot) => {
      const trabajamos = snapshot.val() || {};

      return resolve(dispatch({
        type: 'TRABAJAMOS_REPLACE',
        data: trabajamos,
      }));
    }).catch(reject)).catch(e => console.log(e));
}
 */

// THIS SHOULD NOT BE USED
export function getTrabajamos( category ) {

  console.log("getTrabajamos in actions: ",category);

  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise((resolve, reject) => FirebaseRef
    .child('trabajamos')
    .once('value')
    .then((snapshot) => {
      const trabajamos = snapshot.val() || {};

      return resolve(dispatch({
        type: 'TRABAJAMOS_REPLACE',
        data: trabajamos,
      }));
    }).catch(reject)).catch(e => console.log(e));
}
