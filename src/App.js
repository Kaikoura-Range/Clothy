import './App.css';
import api from './api.js'
import React,{ useEffect } from 'react';



function App() {

  useEffect(() => {

    const prodId = 37315

    const initEndpointData = [
      ['details', `/products/${prodId}`, {}],
      ['reviews', '/reviews/', { product_id: prodId, page: 1, sort: 'newest' }],
      ['QA', '/qa/questions/', { product_id: prodId }],
      ['related', `/products/${prodId}/related/`, {}],
    ]
    api.get.all(initEndpointData)
      .then((response) => {
        console.log('response', response)
      })


  })
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* <ProductDetails />
        <RatingsReviews />
        <QAndA />
        <RelatedProducts /> */}

      </header>
    </div>
  );
}

export default App;
