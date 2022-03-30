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

    productDataInitializer(dispatch)
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



const productDataInitializer = (dispatch, prodId = 37315) => {
  api.get.allProductData(prodId)
    .then((response) => {
      dispatch({
        type: 'PROD_INIT',
        payload: response,
      });
    });
}



export default App;
