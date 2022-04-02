import React, { useState, useEffect } from 'react';
// import { StateContext, DispatchContext } from '../appState/index.js';
import styled from 'styled-components';


import { initRelatedProducts } from './methods.js'
import Carousel from './components/Carousel.js';







var mainRenderCount = 0;
const RelatedProducts = ({ state, dev }) => {
  // const [, dispatch] = useContext(DispatchContext);
  // const [state] = useContext(StateContext);
  const [relatedItemData, setRelatedItemData] = useState([]);

  if( dev.logs ) {
    mainRenderCount++;
    dev.renders && console.log('DEV  RENDER   RelatedProducts     number of renders: ', mainRenderCount)
    dev.state && console.log('DEV  STATE   RelatedProducts: ', state)
  }


  useEffect(() => {
    state.related && initRelatedProducts(state.related, setRelatedItemData)
  }, [state.related])





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
  /* overflow: scroll; */
  padding-top: 15px;
  padding-top: 50px;
  padding-bottom: 50px;
  align-items: center;
  justify-content: space-evenly;
  /* background-color: rgb(245, 245, 245); */
`












export const relatedStateInit = (productId) => {
  return [
    ['related', `/products/${productId}/related/`, {}],
  ]
}

export default RelatedProducts
// export default memo(RelatedProducts)






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