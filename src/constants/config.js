const devMode = (process.env.NODE_ENV !== 'development');
// TODO: change default
export default {
  // App Details
  appName: 'Trabajamos',

  // Build Configuration - eg. Debug or Release?
  DEV: devMode,
  gaTrackingId: 'UA-78256351',
  firebaseUrl: (devMode !== 'development') ? 'https://trabajamos.herokuapp.com' : 'http://localhost:8888',



  // Google Analytics - uses a 'dev' account while we're testing
  // gaTrackingId: (devMode) ? 'UA-78256351' : 'UA-84284256-1',

};
