import Store from '../store/member';

export const initialState = Store;

export default function userReducer(state = initialState, action) {

  console.log("REDUCER MEMBER TYPE: ", action.type);


  switch (action.type) {
    case 'USER_LOGIN': {
      console.log("USER_LOGIN: ", action.data);
      // TODO: not everything below is available  here



      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          createdAt: action.data.createdAt,
          uid: action.data.uid,
          displayName: action.data.displayName,
          category: action.data.category,
          experience: action.data.experience,
          headline: action.data.headline,
          photoURL: action.data.photoURL,
          lastLoginAt: action.data.lastLoginAt,
          email: action.data.email,
          emailVerified: action.data.emailVerified,
          phone: action.data.phoneNumber,
          isworker: action.data.isworker,
          totalstars: action.data.totalstars,
          verified: action.data.verified,
        };
      }
      return initialState;
    }
    case 'USER_DETAILS_UPDATE': {
      console.log("USER_DETAILS_UPDATE: ", action.data);
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          displayName: action.data.displayName,
          category: action.data.category,
          experience: action.data.experience,
          headline: action.data.headline,
          photoURL: action.data.photoURL,
          lastLoginAt: action.data.lastLoginAt,
          email: action.data.email,
          emailVerified: action.data.emailVerified,
          phone: action.data.phoneNumber,
          isworker: action.data.isworker,
          totalstars: action.data.totalstars,
          verified: action.data.verified,
        };
      }
      return initialState;
    }
    case 'USER_TASK_HISTORY': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          fullName: action.data.fullName,
          username: action.data.username,
          signedUp: action.data.signedUp,
          role: action.data.role,
        };
      }
      return initialState;
    }
    case 'USER_SIGNUP': {
      console.log("USER_SIGNUP reducers/member.js: ", action.data );
      if (action.data) {

        //TODO: i need to set up role here so it goes into PROPS
        return {
          ...state,
          loading: false,
          error: null,
          alert: action.alert,
          message: action.message,
          type: action.type,
          fname: action.data.fullName,
          displayName: action.data.displayName,
          username: action.data.username,
          signedUp: action.data.signedUp,
          role: action.data.role,

        };
      }
      return initialState;
    }
    case 'USER_ERROR': {
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: action.data,
        };
      }
      return initialState;
    }
    case 'USER_RESET': {
      console.log("USER_RESET reducers/member.js: ", action.data );
      return initialState;
    }
    case 'USER_DASHBOARD': {
      console.log("USER_DASHBOARD reducers/member.js: ", action.data );

      if (action.data) {
        return {
          ...state,
          uid: action.data.uid,
        };
      }
      return initialState; // logs out and goes to home page

      // return initialState;
    }
    case 'GET_USER_LOCATION': {
      console.log("GET_USER_LOCATION: ", action.data);
      if (action.data) {
        return {
          ...state,
          uid: action.data.uid,
          location: action.data.uid,
        };
      }
      return initialState;
    }
    case 'SAVE_WORKER_SIGNUP': {
      console.log("SAVE_WORKER_SIGNUP: ", action.data);
      if (action.data) {
        return {
          ...state,
          loading: false,
          error: null,
          createdAt: action.data.createdAt,
          uid: action.data.uid,
          fname: action.data.fullName,
          displayName: action.data.displayName,
          photoURL: action.data.photoURL,
          lastLoginAt: action.data.lastLoginAt,
          email: action.data.email,
          emailVerified: action.data.emailVerified,
          phone: action.data.phoneNumber,
        };
      }
      return initialState;
    }
    case 'SAVE_WORKER_LANGUAGE': {
      console.log("SAVE_WORKER_LANGUAGE: ", action.data);
      if (action.data) {
        return {
          ...state,
          languages: action.data.languages,
        };
      }
      return initialState;
    }
    default:
      // console.log("DEFAULT CASE reducers/member.js: ", action.type );
      // console.log("action: ", action );
      return state;
  }
}
