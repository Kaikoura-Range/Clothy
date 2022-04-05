
import React, { useReducer } from "react";
import reducer from './reducer.js';


export const DispatchContext = React.createContext([null, () => {}]);
export const StateContext = React.createContext([{}]);


const initPageState = {
  dev: { logs: false, renders: false, state: true, reducer: true },
  user: { cart:[], outfit: [] },
  currentProduct: 37311,
  QA: {},
  details: {},
  related: {},
  reviews: {},
  reviewMeta: {}
};



const AppContextProvider = ({children, passedState}) => {
  const initState = passedState || initPageState
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <DispatchContext.Provider value={[null, dispatch]}>
      <StateContext.Provider value={[state]}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};


export default AppContextProvider


