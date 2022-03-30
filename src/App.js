import './App.css';
import api from './api.js'
import React,{ useEffect, useContext, useState } from 'react';

import { StateContext, DispatchContext } from './appState/index.js';


function App() {

  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);
  const [inputState, setInputState] = useState('');

  useEffect(() => {
    console.log('state', state)

    const initEndpointData = [
      ['details', `/products/${prodId}`, {}],
      ['reviews', '/reviews/', { product_id: prodId, page: 1, sort: 'newest' }],
      ['QA', '/qa/questions/', { product_id: prodId }],
      ['related', `/products/${prodId}/related/`, {}],
    ]
    api.get.all(initEndpointData)
      .then((response) => {
        const action = {
          type: 'PROD_INIT',
          payload: response
        }
        dispatch(action)
        setTimeout(() => {
          console.log('new state', state)
        }, 500)
      })
  }, [] )


  const updateInput = (e) => {
    console.log('inputState', inputState)
    setInputState(e.target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <input value={inputState} onChange={updateInput} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <ProductDetails state = {state.details} />
        <RatingsReviews />
        <QAndA />
        <RelatedProducts /> */}

      </header>
    </div>
  );
}

export default App;
