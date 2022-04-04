import React, { useContext, useState, useEffect } from 'react';
import { StateContext } from '../appState/index.js';
import styled from 'styled-components';


import { initRelatedProducts } from './methods.js'
import Carousel from './components/Carousel.js';







var mainRenderCount = 0;
const RelatedProducts = () => {
  const [state] = useContext(StateContext)
  const [relatedItemData, setRelatedItemData] = useState([]);
  const { related, user, dev } = state;
  const { outfit } = user

  if( dev.logs ) {
    mainRenderCount++;
    dev.renders && console.log('DEV  RENDER   RelatedProducts     number of renders: ', mainRenderCount)
    dev.state && console.log('DEV  STATE   RelatedProducts: ', related)
  }


  useEffect(() => {
    related && initRelatedProducts(related, state.currentProduct, setRelatedItemData)
  }, [related, state.currentProduct])




  return relatedItemData.length ?
  (
    <RelatedContainer data-testid="related" >
      <HeaderText>Related Products</HeaderText>
      <CarouselContainer  >
        <Carousel products={relatedItemData} outfit={outfit}  />
      </CarouselContainer>
      <HeaderText>My outfit</HeaderText>
      <CarouselContainer >
        <Carousel outfit={outfit} />
      </CarouselContainer>
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
  padding-top: 40px;
  padding-bottom: 40px;
`



const CarouselContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding-top: 10px;
  align-items: center;
  padding-bottom: 10px;
  justify-content: space-evenly;
`

const HeaderText = styled.h1`
  font-size: 24px;
  margin-left: 7.5%;
  color: rgb(50, 50, 50);
`










export const relatedStateInit = (productId) => {
  return [`/products/${productId}/related/`, {}]
}

export default RelatedProducts