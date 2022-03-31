import React, {useState, useContext, useEffect} from 'react';
import { StateContext, DispatchContext } from './../appState/index.js';
//import api from './../api.js';

function ProductDetails() {
  const [state] = useContext(StateContext);
  const [, dispatch] = useContext(DispatchContext);
  const [activeProduct, setActiveProduct] = useState('');
  // const [activeStyle, setActiveStyle] = useState('');

  useEffect(() => {
    setActiveProduct(state.details);
  }, [state.details, state.currentProduct])

  console.log('DEV RENDER ProductDetails')
  return (<div>ProductDetails Section</div>);


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