
import React, { useContext } from 'react';
import styled from 'styled-components';

import { DispatchContext } from '../../appState/index.js';
import RelatedCard from './RelatedCard.js'


const Carousel = ({ products }) => {
  // console.log('products', products)
  const [, dispatch] = useContext(DispatchContext);
  return (
    <CarouselContainer>
      {products.map(data => <RelatedCard data={data} dispatch={dispatch} key={data.id ? data.id : data} />)}
    </CarouselContainer>
  )
}

const CarouselContainer = styled.div`
  width: 95%;
  height: auto;
  display: flex;
  padding: 10px;
  overflow: scroll;
  border-radius: 7px;
  padding-top: 20px;
  padding-bottom: 20px;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgb(242, 242, 242);
`



export default Carousel;

