import React, { createContext, useReducer, useEffect } from "react";
import reducer from "../reducers";
import initialState from "../state";
import { useActions } from "../actions";

const StoreContext = createContext(initialState);

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = useActions(state, dispatch);

  useEffect(() => {
    if (process.env.REACT_APP_ENV !== "production") console.log({ newState: state })
  }, [state]);
  
  return (
    <StoreContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

export { 
  StoreProvider as default,
  StoreContext
};