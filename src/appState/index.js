
import React, { useReducer } from "react";
import reducer from './reducer.js';


export const DispatchContext = React.createContext([null, () => {}]);
export const StateContext = React.createContext([{}]);


const initPageState = {
  currentProduct: 37315,
  QA: {},
  details: {},
  related: {},
  reviews: {},
};



const AppContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initPageState);

  return (
    <DispatchContext.Provider value={[null, dispatch]}>
      <StateContext.Provider value={[state]}>
        {props.children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};


export default AppContextProvider


