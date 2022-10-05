export const initialState = {
  loading: false,
  info: null,
  error: null,
  success: null,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case 'STATUS_REPLACE': { // runs when forgot password button is clicked
      return {
        ...state,
        loading: action.loading || false,
        info: action.info || null,
        error: action.error || null,
        success: action.success || null,
      };
    }
    default:
      return state;
  }
}
