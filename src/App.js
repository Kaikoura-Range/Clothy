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
    console.log(state)
    initializeAppState(dispatch, state, state.currentProduct)

  }, []);

  useEffect(() => {
    console.log('state', state)
    initializeAppState(dispatch, state, state.currentProduct)
    // console.log('main state', state)
  }, [state.currentProduct]);


  return (
    <div className='App'>
      <div>{state.details.init ? state.details.init.name : 'loading'} </div>
      <div>{state.details.init ? state.details.init.description : null} </div>

      <ProductDetails />
      <RelatedProducts state={state.related} />
      <QAndA />
      <RatingsReviews />
    </div>
  );
}




const initializeAppState = (dispatch, state, prodId) => {
  api.get.allProductData(prodId)
    .then((response) => {
      dispatch({
        type: 'PROD_INIT',
        payload: { ...state, ...response}
      });
    });
}



export default App;
