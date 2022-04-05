
import React, { useContext } from 'react';
import styled from 'styled-components';
import { initializeAppState } from '../methods.js'

import { DispatchContext } from '../../appState/index.js';
import RelatedCard from './RelatedCard.js'


const getAddProductToOutfit = (outfit, dispatch, productData) => {
  return () => {
    const notInOutFit = outfit.every(product => productData.id !== product.id)
    if (notInOutFit) {
      const newOutfit = [productData, ...outfit]
      dispatch({
        type: 'SET_OUTFIT',
        payload: newOutfit,
      })
    } else {
      console.log('already in your outfit.')
    }
  }
}


const getRemoveProductFromOutfit = (outfit, dispatch, index) => {
  return () => {
    const newOutfit = [...outfit]
    newOutfit.splice(index, 1)
    dispatch({
      type: 'SET_OUTFIT',
      payload: newOutfit
    })
  }
}


const Carousel = ({ products, outfit }) => {
  var rendered = products || outfit
  const [, dispatch] = useContext(DispatchContext);
  const cardFunction = products ? getAddProductToOutfit : getRemoveProductFromOutfit


  rendered = rendered.length ? rendered : [{}]
  return (
    <CarouselContainer data-testid={'carousel'} >
      {rendered.map((data, ind) =>
        <RelatedCard
        data={data}
        outfit={products ? cardFunction(outfit, dispatch, data) : cardFunction(outfit, dispatch, ind)}
        nav={() => initializeAppState(dispatch, data.id)}
        key={data.id ? data.id : data}
        action={products ? "Add to" : "Remove from"}
        />)}
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  width: 85%;
  height: auto;
  display: flex;
  padding: 15px;
  overflow: auto;
  white-space: nowrap;
  border-radius: 7px;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
  background-color: rgb(242, 242, 242);
`



export default Carousel;

