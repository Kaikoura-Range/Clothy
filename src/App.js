import './App.css';
import api from './api.js'
import React,{ useEffect } from 'react';



function App() {

  useEffect(() => {

    const prodId = 37315
    api.get.allProductData(prodId)
      .then(res => console.log('all product data', res))


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
