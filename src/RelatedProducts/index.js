import React, { useLayoutEffect, useState, useEffect, useContext } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import api from '../api.js';


export default function RelatedProducts() {
  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);

  useEffect(() => {

    if (state.related.main){
      console.log('related', state.related)
    }

  }, [state.related])

  return <div>RelatedProducts Section</div>;
}




export const relatedStateInit = (productId) => {
  return [
    ['main', `/products/${productId}/related/`, {}],
  ]
}