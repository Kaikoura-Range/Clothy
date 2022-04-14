
import React, { useContext } from 'react';
import styled from 'styled-components';
import api from '../../api/index'
import { DispatchContext } from '../../appState/index.js';
import { RelatedCard } from './RelatedCard.js'




const Carousel = ({ products, outfit, track }) => {
  const [, dispatch] = useContext(DispatchContext);
  var rendered = products || outfit
  var cardFunction = products ? compareToCurrent : getRemoveProductFromOutfit



  return (
    <CarouselContainer data-testid={'carousel'} >
      {rendered.map((data, ind) => {
        cardFunction = data.type !== 'emptyOutfit' ? cardFunction : getAddProductToOutfit
        return (
          <RelatedCard
          track={track}
          data={data}
          outfit={cardFunction(outfit, dispatch, data, ind)}
          nav={() => navToNewProduct(data.id, dispatch)}
          key={data.id ? data.id : ind}
          dispatch={dispatch}
          action={products ? "Compare" : "Remove"}
          />
        )
      })}
    </CarouselContainer>
  )
}



const navToNewProduct = (productId, dispatch) => {
  api.load.newProduct(productId, dispatch)
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
   });
}


const compareToCurrent = (outfit, dispatch, productData, index) => {
  return () => {
      dispatch({
        type: 'TOGGLE_MODAL',
        payload: {
          name: 'compare',
          props: {
            newProduct: productData
          }
        },
      })
  }
}


const getRemoveProductFromOutfit = (outfit, dispatch, productData, index) => {
  return () => {
    const newOutfit = [...outfit.map(product => product.id)]
    newOutfit.splice(index, 1)
    dispatch({
      type: 'SET_OUTFIT',
      payload: newOutfit
    })
  }
}


const getAddProductToOutfit = (outfit, dispatch, productData, index) => {

  if (productData.type === 'emptyOutfit') {
    outfit = outfit.filter(outfitData => outfit.type === productData.type)
  }

  return () => {
    const notInOutFit = outfit.length ?  outfit.every(product => productData.id !== product.id) : true;
    if (notInOutFit) {
      const newOutfit = [productData.id, ...outfit.map(product => product.id) ]
      dispatch({
        type: 'SET_OUTFIT',
        payload: newOutfit,
      })
    } else {
      console.log('already in your outfit.')
    }
  }
}


const CarouselContainer = styled.div`
  height: auto;
  display: flex;
  padding: 2em;
  overflow: auto;
  padding-top: 2em;
  align-items: center;
  white-space: nowrap;
  width: var(--module-width);
  background-color: var( --contain-bgc);

`



export default Carousel;




