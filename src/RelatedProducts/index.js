import React, { useLayoutEffect, useState, useEffect, useContext, memo } from 'react';
import { StateContext, DispatchContext } from '../appState/index.js';
import api from '../api.js';



// const RelatedInputNonMemo = (props) => {
//   console.log('DEV  RENDER   RelatedInput')
//   const [inputState, setInputState] = useState('');
//   return (
//     <div>
//       <input value={inputState} onChange={(e) => setInputState(e.target.value)} />
//     </div>
//   )
// }

// const RelatedInput = memo(RelatedInputNonMemo)


const RelatedInput = (props) => {
  console.log('DEV  RENDER   RelatedInput')
  const [inputState, setInputState] = useState('');
  return (
    <div>
      <input value={inputState} onChange={(e) => setInputState(e.target.value)} />
    </div>
  )
}



export default function RelatedProducts({ state, dev }) {
  const [, dispatch] = useContext(DispatchContext);
  // const [state] = useContext(StateContext);
  const [inputState, setInputState] = useState('');
  if( dev.pref ) {
    console.log('DEV  RENDER   related')
  }

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
      {/* <input value={inputState} onChange={(e) => setInputState(e.target.value)} /> */}
      <RelatedInput />
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