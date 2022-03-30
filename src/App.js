import './App.css';
import api from './api.js';
import React, { useEffect, useContext, useState } from 'react';
import { StateContext, DispatchContext } from './appState/index.js';
import ProductDetails from './ProductDetails/index';
import RelatedProducts from './RelatedProducts/index';
import QAndA from './QandA/index';
import RatingsReviews from './RatingsReviews/index';

function App() {
  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);
  const [inputState, setInputState] = useState('');

  useEffect(() => {
    console.log('state', state);
    const prodId = 37315;
    const initEndpointData = [
      ['details', `/products/${prodId}`, {}],
      ['reviews', '/reviews/', { product_id: prodId, page: 1, sort: 'newest' }],
      ['QA', '/qa/questions/', { product_id: prodId }],
      ['related', `/products/${prodId}/related/`, {}],
    ];
    api.get.all(initEndpointData).then((response) => {
      const action = {
        type: 'PROD_INIT',
        payload: response,
      };
      dispatch(action);
      setTimeout(() => {
        console.log('new state', state);
      }, 500);
    });
  }, []);

  const updateInput = (e) => {
    console.log('inputState', inputState);
    setInputState(e.target.value);
  };

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
