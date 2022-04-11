import React, { useState, useContext, useEffect } from 'react';
import { StateContext } from './../appState/index.js';
import Info from './components/ProductInfo.js';
import Description from './components/ProductDesc.js';
import Features from './components/ProductFeatures.js';
import { FlexRow, DetailsContainer } from './styles/Flex.styled.js'
import { StyledDescFeaturesContainer } from './styles/DescFeatures.styled.js'
let renderCount = 0;
function ProductDetails() {
  const [state] = useContext(StateContext);
  // const [, dispatch] = useContext(DispatchContext);
  const { details, currentProduct, reviews } = state;
  const { product, styles } = state.details;
  const [activeProduct, setActiveProduct] = useState(product);
  const [allStyles, setAllStyles] = useState(styles);
  const [totalReviews, setTotalReviews] = useState(0);

  if( state.dev.logs ) { // Used to see preformance and data flow
    renderCount++
    state.dev.renders.mod.details && console.log('\nDEV-RENDER   details     renderCount: ', renderCount, '\n')
    state.dev.state.mod.details && console.log('DEV-STATE  details:', state.details, '\n')
  }

  useEffect(() => {
    setActiveProduct(product);
    setAllStyles(styles);
    // console.log(reviews);
    if (reviews.reviews.results !== undefined) {
      setTotalReviews(reviews.reviews.results.length)
    }
  }, [details, currentProduct, reviews])


  return (
    <DetailsContainer data-testid="details" >
      <Info product={activeProduct} styles={allStyles} reviews={totalReviews} rating={reviews.meta.ratings} img={state.img}/>
      <StyledDescFeaturesContainer>
         <FlexRow>
            <h2>Product Description</h2>
            <Description product={activeProduct}/>
            <Features product={activeProduct}/>
          </FlexRow>
      </StyledDescFeaturesContainer>
    </DetailsContainer>);

}

export default ProductDetails;
