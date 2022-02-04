import initialState from '../../state';
import {
  IS_LOADING,
  SET_DATA,
  RESET_DATA,
  SET_STEP,
  SET_STEP_JOURNEY,
  SET_DIALOG,
} from "../../types";

const reducer = (state, action) => {
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
    case SET_STEP: {
      return { ...state, step: action.data};
    }
    default:
      return state;
  }
}

export default reducer