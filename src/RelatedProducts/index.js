import React, { useLayoutEffect, useState, useEffect, useContext, memo } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import api from '../api.js';



// const RelatedInputNonMemo = (props) => {
//   console.log('DEV  RENDER  Memod RelatedInput')
//   const [inputState, setInputState] = useState('');
//   return (
//     <div>
//       <input value={inputState} onChange={(e) => setInputState(e.target.value)} />
//     </div>
//   )
// }

// const RelatedInput = memo(RelatedInputNonMemo)



var inputRenderCount = 0;

const RelatedInput = (props) => {
  // inputRenderCount++;
  // console.log('DEV  RENDER   RelatedInput     number of renders: ', inputRenderCount)
  const [inputState, setInputState] = useState('');
  return (
    <div>
      <input value={inputState} onChange={(e) => setInputState(e.target.value)} />
    </div>
  )
}




var mainRenderCount = 0;

const RelatedProducts = ({ state, dev }) => {
  const [, dispatch] = useContext(DispatchContext);
  // const [state] = useContext(StateContext);
  const [inputState, setInputState] = useState('');
  if( dev.logs ) {
    mainRenderCount++;
    dev.renders && console.log('DEV  RENDER   RelatedProducts     number of renders: ', mainRenderCount)
    dev.state && console.log('DEV  STATE   RelatedProducts: ', state)
  }


  useEffect(() => {
  }, [])



  return state.related ?
  (
    <div>
      {/* <input value={inputState} onChange={(e) => setInputState(e.target.value)} /> */}
      <RelatedInput />
      {state.related.map((newId, ind) => {
        return <button key={ind} onClick={() => addProductToOutfit(dispatch, newId)} >Nav to product {newId} </button>
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

const addProductToOutfit = (dispatch, prodId) => {
  dispatch({
    type: 'ADD_PRODUCT_TO_OUTFIT',
    payload: prodId,
  });
}


const initializeAppState = (dispatch, prodId) => {
  api.get.allProductData(prodId)
    .then((response) => {
      response.currentProduct = prodId
      dispatch({
        type: 'PROD_INIT',
        payload: response,
      });
    });
}

export const relatedStateInit = (productId) => {
  return [
    ['related', `/products/${productId}/related/`, {}],
  ]
}

export default RelatedProducts
// export default memo(RelatedProducts)