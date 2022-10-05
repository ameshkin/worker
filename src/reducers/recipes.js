import Store from '../store/recipes';

export const initialState = Store;

export default function recipeReducer(state = initialState, action) {


  console.log("Rrecipepsdfasdfasdf: " , action.type);


  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'TRABAJAMOS_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        trabajamos: action.trabajamos,
      };
    }

    case 'GEOLOCATION_GET': {
      return {
        ...state,
        latitude: 50,
        longitude: -90,
      };
    }

    case 'CATEGORIES_REPLACE': {
      return {
        ...state,
        error: null,
        loading: false,
        categories: action.data,
      };
    }
    case 'RECIPES_ERROR': {
      return {
        ...state,
        error: action.data,
      };
    }
    case 'GET_WORKER_DETAIL': {
      let worker = [];

      console.log("GET_WORKER_DETAIL running in reducers/recipes.js: ");

      if (action.data && typeof action.data === 'object') {
        worker = action.data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          subheader: item.subheader,
          image: item.image,
          moreinfo: item.moreinfo,
          ratings: item.ratings,
          username: item.username,
          languages: item.languages,
          stats: item.stats,
          private: item.private,
        }));
      }


      return {
        ...state,
        error: null,
        loading: false,
        worker,
      };
    }
    case 'RECIPES_REPLACE': {
      let recipes = [];

      // Pick out the props I need
      /*
      if (action.data && typeof action.data === 'object') {
        recipes = action.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
          category: item.category,
          image: item.image,
          author: item.author,
          languages: item.languages,
          method: item.method,
        }));
      }
      */

      if (action.data && typeof action.data === 'object') {
        recipes = action.data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          subheader: item.subheader,
          image: item.image,
          moreinfo: item.moreinfo,
          ratings: item.ratings,
          username: item.username,
          languages: item.languages,
          stats: item.stats,
          private: item.private,
        }));
      }


      return {
        ...state,
        error: null,
        loading: false,
        recipes,
      };
    }
    case 'SHOW_WORKERS_BY_CATEGORY': {
      let recipes = [];

      console.log("Reducer SHOW_WORKERS_BY_CATEGORY");


      //TODO: this is where we find out if we want english or spanish!!!

      //TODO:  restrict to only the category we want!

      console.log(action.data);

      /*
      if (action.data && typeof action.data === 'object') {
        recipes = action.data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          subheader: item.subheader,
          image: item.image,
          moreinfo: item.moreinfo,
          ratings: item.ratings,
          username: item.username,
          languages: item.languages,
          stats: item.stats,
          private: item.private,
        }));
      }
      */

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        recipes = action.data.map(item => ({
          id: item.id,
          title: item.title,
          category: item.category,
          subheader: item.subheader,
        }));
      }

      return {
        ...state,
        error: null,
        loading: false,
        recipes,
      };
    }
    default:
      return state;
  }
}

export function getCoords() {



  // TODO: do I run navigator code in here?


  return {
    type: 'GEOLOCATION_GET',
    payload: {
      request: {
        url: `/users/test/repos`
      }
    }
  };
}
