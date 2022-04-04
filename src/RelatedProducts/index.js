import React, { useState, useEffect } from 'react';
// import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';


import { initRelatedProducts } from './methods.js'
import Carousel from './components/Carousel.js';







var mainRenderCount = 0;
const RelatedProducts = ({ relatedProducts, dev }) => {
  // const [, dispatch] = useContext(DispatchContext);
  // const [state] = useContext(StateContext);
  const [relatedItemData, setRelatedItemData] = useState([]);

  if( dev.logs ) {
    mainRenderCount++;
    dev.renders && console.log('DEV  RENDER   RelatedProducts     number of renders: ', mainRenderCount)
    dev.state && console.log('DEV  STATE   RelatedProducts: ', relatedProducts)
  }


  useEffect(() => {
    relatedProducts && initRelatedProducts(relatedProducts, setRelatedItemData)
  }, [relatedProducts])





  return relatedItemData.length ?
  (
    <RelatedContainer data-testid="related" >
      <Carousel products={relatedItemData} />
    </RelatedContainer>
  )
  :
  (
    <div data-testid="related" >
      <div>loading</div>
    </div>
  )
}


const RelatedContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding-top: 15px;
  padding-top: 50px;
  padding-bottom: 50px;
  align-items: center;
  justify-content: space-evenly;
  /* background-color: rgb(245, 245, 245); */
`












export const relatedStateInit = (productId) => {
  return [`/products/${productId}/related/`, {}]
}

export default RelatedProducts