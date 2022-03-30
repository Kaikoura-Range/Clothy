import './App.css';
import api from './api.js';
import React, { useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from './appState/index.js';
import ProductDetails from './ProductDetails/index';
import RelatedProducts from './RelatedProducts/index';
import QAndA from './QandA/index';
import RatingsReviews from './RatingsReviews/index';



function App() {
  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);

  useEffect(() => {

    initializeAppState(dispatch)
    setTimeout((() => console.log(state)), 500)

  }, []);



  return (
    <div className='App'>
      <ProductDetails />
      <RelatedProducts />
      <QAndA />
      <RatingsReviews />
    </div>
  );
}




const initializeAppState = (dispatch, prodId = 37315) => {
  api.get.getAllProductData(prodId)
    .then((response) => {
      const action = {
        type: 'PROD_INIT',
        payload: response,
      };
      dispatch(action);
  });
}



export default App;
