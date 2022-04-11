import React, { useContext } from 'react';
import styled from 'styled-components';
import { DispatchContext } from '../../appState/index.js'
import api from '../../api/index.js'


const SearchBarDropDown = ({ products, onLoad }) => {
  const [, dispatch] = useContext(DispatchContext);

  const loadProduct = (id) => {
    return (e) => {
      api.load.newProduct(id, dispatch)
      onLoad([])
    }
  }

  return products.length ? (
    <DropDownContainer>
        {products.map(productData => {
          const { name, id } = productData
          return (
            <ProductContainer key={id} onClick={loadProduct(id)} >
              {name}
            </ProductContainer>
          )
        })}
    </DropDownContainer>
  )
  :
  null
}

const DropDownContainer = styled.div`
  width: 100%;
  display: flex;
  position: absolute;
  flex-direction: column;
`



const ProductContainer = styled.div`
  width: 100%;
  padding: 0.5em;
  background-color: var(--bgc-2);
  /* background-color: var(--element-bgc); */
  &:hover {
    cursor: pointer;
    background-color: var(--bgc-3);
  }
`


export default SearchBarDropDown