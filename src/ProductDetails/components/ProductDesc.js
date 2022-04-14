import React from 'react';
import { StyledDescriptionContainer } from './../styles/DescFeatures.styled.js'

function ProductDescription({product}) {
  if (product) {

      return(<StyledDescriptionContainer>
        { product.description ? <>
          <h3>{product.slogan}</h3>
          <p>{product.description}</p>
          </> : ''}
      </StyledDescriptionContainer>)

  } else {
    return(<StyledDescriptionContainer>
        <h3>''</h3>
        <p>loading</p>
    </StyledDescriptionContainer>)
  }
}

export default ProductDescription;