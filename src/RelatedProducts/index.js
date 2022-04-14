import React, { useContext, useState, useEffect } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';


import { initProductsFromIds } from './methods.js'
import Carousel from './components/Carousel.js';
import tracker from '../components/Tracker.js'





var renderCount = 0;
const RelatedProducts = ({ children }) => {
  console.log('Related arguments', arguments)

  const [state] = useContext(StateContext)
  const [, dispatch] = useContext(DispatchContext)
  const { related, user, dev, currentProduct } = state;
  const { outfit } = user



  const relatedInit = related.length ? Array(related.length).fill({}) : [ { type: 'emptyRelated', id: state.currentProduct } ];
  const [relatedItemData, setRelatedItemData] = useState(relatedInit);
  const outfitInit = outfit.length ? Array(outfit.length).fill({}) : [ { type: 'emptyOutfit', id: state.currentProduct } ];
  const [outFitItemData, setOutfitItemData] = useState(outfitInit);

  if( dev.logs ) { // Used to see preformance and data flow
    renderCount++
    dev.renders.mod.related && console.log('\nDEV-RENDER   related   renderCount: ', renderCount, '\n')
    dev.state.mod.related && console.log('\nDEV-STATE    related:', related, '\n')
  }

  useEffect(() => {
    if (related.length) {
      initProductsFromIds(related, currentProduct, setRelatedItemData)
    } else {
      setRelatedItemData([ { type: 'emptyRelated', id: state.currentProduct } ])
    }
  }, [related, currentProduct, state.currentProduct])


  useEffect(() => {
    if (outfit.length) {
      initProductsFromIds(outfit, currentProduct, setOutfitItemData, false)
    } else {
      setOutfitItemData([ { type: 'emptyOutfit', id: state.currentProduct } ])
    }
  }, [outfit, currentProduct, state.currentProduct])


  return (
      <RelatedContainer data-testid="related" >
        <HeaderText>Related Products</HeaderText>
        <CarouselContainer  >
          <Carousel products={relatedItemData} outfit={outFitItemData} />
        </CarouselContainer>
        <HeaderText>My outfit</HeaderText>
        <CarouselContainer >
          <Carousel outfit={outFitItemData} />
        </CarouselContainer>
      </RelatedContainer>

  )
}




const RelatedContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;
  flex-direction: column;
  justify-content: space-evenly;

`

const CarouselContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  padding-top: 0.6em;
  align-items: center;
  padding-bottom: 1.2em;
  justify-content: space-evenly;
`

const HeaderText = styled.h1`
  margin-left: 5%;
  font-size: var(--header-fs);
  color: var(--header-fc);
`



export default RelatedProducts