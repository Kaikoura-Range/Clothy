import api from './api/index.js';
import React, {  useContext } from 'react';
import styled from 'styled-components';
import Header from './components/Header/index.js'
import Modal from './components/Modal/index'
import { StateContext, DispatchContext } from './appState/index.js';
import ProductDetails from './ProductDetails/index';
import RatingsReviews from './RatingsReviews/index';
import QAndA from './QandA/index';
import RelatedProducts from './RelatedProducts/index';
import Tracker from './components/Tracker'


const maxApiRequests = 2;
var renderCount = 0;
var requestCount = 0;


function App() {
  const [, dispatch] = useContext(DispatchContext);
  const [state] = useContext(StateContext);

  if( state.dev.logs ) { // Used to see preformance and data flow
    renderCount++
    state.dev.renders.mod.main && console.log('\nDEV-RENDER   App   renderCount: ', renderCount, '\n')
    state.dev.state.mod.main && console.log('\nDEV-STATE  App: \n', state, '\n')
  }
  if (state.dev.test) { // Gives tests access to state while running
    state.dev.get(state)
  }
  if (!state.details.product) {
    if (maxApiRequests > requestCount) {
      requestCount++
      api.load.newProduct(state.currentProduct, dispatch)
      return (
        <LoadingContainer className='App' data-testid="app"  >
          <LoadingScreen>
          </LoadingScreen>
        </LoadingContainer>
      );
    } else {
      return (
        <LoadingContainer className='App' data-testid="app"  >
          <LoadingScreen>
            <LoadingText>404 not found</LoadingText>
          </LoadingScreen>
        </LoadingContainer>
      );
    }
  } else {
    requestCount = 0

    return (
        <AppContainer className='App' data-testid="app"  >
          {/* <Modal /> */}
          <Header />
          <ProductDetails />
          <RelatedProducts  />
          <QAndA />
          <RatingsReviews reviewData={state.reviews.reviews} reviewMeta={state.reviews.meta} dev={state.dev} theme={state.user.theme}/>
          <Footer><small>{'\u00a9 2022 Kaikoura Range. All rights reserved.'}</small></Footer>
        </AppContainer>
    );
  }
}


const AppContainer = styled.div`
  width: 100%;
  background-color: var(--main-bgc);

`
const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--contain-bgc);

`

const LoadingScreen = styled.div`
  width: 50%;
  height: 50%;
  display: flex;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  background-color: var(--main-bgc);

`

const Footer = styled.footer`
  height: 2em;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bgc-3);
`


export default App;
