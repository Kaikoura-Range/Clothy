import React, {useState, useContext, useEffect} from 'react';
import { StateContext, DispatchContext } from './../appState/index.js';
import api from './../api.js';

function ProductDetails() {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);

  useEffect(() => {

    // accessProductStyles(state.currentProduct)
    //   .then(stylesData => {console.log(stylesData)})

    console.log(state.details);
  }, [state.details, state.currentProduct])

  // console.log('DEV RENDER ProductDetails')
  return <div>ProductDetails Section</div>;
}

const accessProductStyles = (productId) => {

  return api.get.all([
    // API GET request on key, endpoint, params
    // ['productStyles', `/products/${productId}/styles`, {}]
  ])
}


// When page is loaded, call the API on a default product
const detailsStateInit = (productId) => {
  return [
    // API GET request on key, endpoint, params
    ['styles', `/products/${productId}/styles`, {}],
    ['product', `/products/${productId}`, {}]
  ]
}

export default ProductDetails;
export {detailsStateInit};