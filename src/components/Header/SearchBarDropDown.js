import React from 'react';
import styled, { css } from 'styled-components';


const SearchBarDropDown = ({ selectable, selected, loadSelected, dropDown }) => {

  selectable = selectable.length > 15 ? selectable.slice(0, 15) : selectable;
  return dropDown ? (
    <DropDownContainer>
        {selectable.map((productData, ind) => {
          const { name, id } = productData
          return (
            <ProductContainer hilight={selected === ind}  key={id} onClick={loadSelected(id)} >
               <ProductText hilight={selected === ind} >{name}</ProductText>
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
  background-color: ${({ hilight }) => hilight ? css`var(--accent-color)`  : css`var(--bgc-2)` };
  &:hover {
    cursor: pointer;
    background-color: var(--bgc-3);
  }
`

const ProductText = styled.p`
    color: ${({ hilight }) => hilight ? css`#111`  : css`var(--body-fc)` };
`


export default SearchBarDropDown