import React, { useLayoutEffect, useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import api from '../api.js';


export default function RelatedProducts({ state }) {
  const [, dispatch] = useContext(DispatchContext);
  // const [state] = useContext(StateContext);

  useEffect(() => {
  }, [])


  const changeProduct = (newId) => {
    return () => {
      dispatch({
        type: 'CHANGE_PRODUCT',
        payload: newId,
      })
    }
  }

  return state.related ?
  (
    <div>
      {state.related.map((newId, ind) => {
        return <button key={ind} onClick={changeProduct(newId)} >Nav to product {newId} </button>
      })}
    </div>
  )
  :
  (
    <div>
      <div>loading</div>
    </div>
  )
}



export const relatedStateInit = (productId) => {
  return [
    ['related', `/products/${productId}/related/`, {}],
  ]
}