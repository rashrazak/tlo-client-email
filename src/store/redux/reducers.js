import {
  IS_LOADING,
  SET_DATA,
  RESET_DATA,
  SET_STEP,
  SET_STEP_JOURNEY,
  SET_DIALOG,
} from "../types";
import initialState from '../state';




const Reducer = (state = initialState, action) => {
  // const { type, data, err, name } = action;
  switch (action.type) {
    case SET_DIALOG: {
      const content = { isDialogShow: action.data.show }
      if (action.data.dialog) content.dialog = action.data.dialog
      return { ...state, ...content };
    }
    case IS_LOADING: {
      return { ...state, isLoading: action.data};
    }
    case SET_DATA: {
      return action.name ? { ...state, [action.name]: {...action.data} } : {...state, ...action.data};
    }
    case RESET_DATA: {
      return { ...initialState };
    }
    //show samples on every state management
    case SET_STEP: {
      return { ...state, step: action.data};
    }
    default:
      return state;
  }
};
export default Reducer;
