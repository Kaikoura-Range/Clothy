import './App.css';
import api from './api.js';
import React, { useLayoutEffect, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from './appState/index.js';
import ProductDetails, { detailsStateInit } from './ProductDetails/index';
import RatingsReviews, { reviewStateInit } from './RatingsReviews/index';
import QAndA, { qAndAStateInit } from './QandA/index';
import RelatedProducts, { relatedStateInit } from './RelatedProducts/index';

api.get.initProductDataFetch(
  detailsStateInit,
  reviewStateInit,
  qAndAStateInit,
  relatedStateInit,
)

function App() {
  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);

  useLayoutEffect(() => {

    initializeAppState(dispatch)
    setTimeout((() => console.log('init state', state)), 250)

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
  api.get.allProductData(prodId)
    .then((response) => {
      dispatch({
        type: 'PROD_INIT',
        payload: response,
      });
    });
}



export default App;
