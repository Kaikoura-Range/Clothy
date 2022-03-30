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

    api.get.allProductData(37315)
      .then((response) => {
        dispatch({
          type: 'PROD_INIT',
          payload: response,
        });
      });
    setTimeout((() => console.log(state)), 1000)

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











export default App;
