import React, {useState, useContext, useEffect} from 'react';
import { StateContext} from './../appState/index.js';
import Info from './components/ProductInfo.js';
import Description from './components/ProductDesc.js';
import Features from './components/ProductFeatures.js';


function ProductDetails() {
  const [state] = useContext(StateContext);
  // const [, dispatch] = useContext(DispatchContext);
  const [activeProduct, setActiveProduct] = useState({});
  const [styles, setStyles] = useState([]);

  if (state.dev.logs) {
    console.log('DEV RENDER ProductDetails')
  }

  useEffect(() => {
    setActiveProduct(state.details.product);
    setStyles(state.details.styles);

  }, [state.details, state.currentProduct])


  return (<div data-testid="details" >
    <br/>
    <Info product={activeProduct} styles={styles}/>
    <br/>
    <Description product={activeProduct}/>
    <br/>
    <Features product={activeProduct}/>
  </div>);


}

// When page is loaded, call the API on a default product
const detailsStateInit = (productId) => {
  return [
    // API GET request on key, endpoint, params
    ['product', `/products/${productId}`, {}],
    ['styles', `/products/${productId}/styles`, {}]
  ]
}

export default ProductDetails;
export {detailsStateInit};