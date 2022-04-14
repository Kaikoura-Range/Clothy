import React, { useState, useContext, useEffect } from 'react';
import { StateContext } from './../appState/index.js';
import Info from './components/ProductInfo.js';
import Description from './components/ProductDesc.js';
import Features from './components/ProductFeatures.js';
import { StyledDescFeaturesContainer } from './styles/DescFeatures.styled.js'

function ProductDetails({reviewSection}) {
  const [state] = useContext(StateContext);
  const { details, currentProduct, reviews } = state;
  const { product, styles } = state.details;
  const [activeProduct, setActiveProduct] = useState(product);
  const [allStyles, setAllStyles] = useState(styles);
  const [totalReviews, setTotalReviews] = useState(0);

  if (state.dev.logs) {
    console.log('DEV RENDER ProductDetails')
  }

  useEffect(() => {
    setActiveProduct(product);
    setAllStyles(styles);
    if (reviews.reviews.results !== undefined) {
      setTotalReviews(reviews.reviews.results.length);
    }
  }, [details, currentProduct, reviews])


  return (
    <div data-testid="details" >
      <Info product={activeProduct} styles={allStyles} reviews={totalReviews} rating={reviews.meta.ratings} theme={state.user.theme}/>
      <StyledDescFeaturesContainer>
        <h2>Product Description</h2>
        <Description product={activeProduct}/>
        <Features product={activeProduct}/>
      </StyledDescFeaturesContainer>
    </div>);

}

export default ProductDetails;
