/* global window */
import { createStore, applyMiddleware, compose } from 'redux';
import RNFirebase from 'react-native-firebase';
import { getFirebase, reactReduxFirebase } from 'react-redux-firebase';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage'; // default: localStorage if web, AsyncStorage if react-native
import thunk from 'redux-thunk';
import reducers from '../reducers';

// Redux Persist config
const config = {
  key: 'root',
  storage,
  blacklist: ['status'],
};

const reducer = persistCombineReducers(config, reducers);

const middleware = [thunk];

const reactNativeFirebaseConfig = {
  debug: true
};

const reduxFirebaseConfig = {
  userProfile: 'users', // save users profiles to 'users' collection
};


const configureStore = (initialState = { firebase: {} }) => {

  // initialize firebase
  const firebase = RNFirebase.initializeApp(reactNativeFirebaseConfig);

  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(
      reactReduxFirebase(firebase, reduxFirebaseConfig),
      applyMiddleware(...middleware)
    ),
  );

  const persistor = persistStore(
    store,
    null,
    () => { store.getState(); },
  );

  return { persistor, store };
};


/*
const configureStore = () => {
  const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(...middleware)),
  );

  const persistor = persistStore(
    store,
    null,
    () => { store.getState(); },
  );

  return { persistor, store };
};
*/

export default configureStore;


/*
RNFirebase core module was not found natively on iOS, ensure you have correctly included the RNFirebase pod in your projects `Podfile` and have run `pod install`.

 See http://invertase.link/ios for the ios setup guide.

Firebase
    <unknown file>:0
<unknown>
    <unknown file>:0
loadModuleImplementation
    require.js:214:12
<unknown>
    index.js:31:597
loadModuleImplementation
    require.js:214:12
<unknown>
    index.js:3
loadModuleImplementation
    require.js:214:12
<unknown>
    App.js:3
loadModuleImplementation
    require.js:214:12
<unknown>
    crna-entry.js:7:11
loadModuleImplementation
    require.js:214:12
guardedLoadModule
    require.js:141:45
global code
    <unknown file>:0

 */
