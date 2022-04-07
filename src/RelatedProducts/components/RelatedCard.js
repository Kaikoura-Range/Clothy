// import { useState, useEffect } from 'react';
import styled from 'styled-components';
import PhotoCarousel from './PhotoCarousel.js'

// const fadeTime = 400;
// const splitFade = Math.round(fadeTime / 2) - Math.round(fadeTime * 0.15)


export const RelatedCard = ({ data, outfit, nav, action }) => {
  data.photos = data.photos || []
  const { name, photos } = data;

  if ( data.type === 'render') {

    return  (
      <RelatecCardContainer data-testid="RelatedCard" >
        <PhotoCarousel photos={photos} nav={nav} action={action} outfit={outfit} />
        <CardFooter>
          <CardFooterText>{name}</CardFooterText>
          {/* <CardFooterButtonContainer>
          </CardFooterButtonContainer> */}
        </CardFooter>
      </RelatecCardContainer>
    );
  }
  if (data.type === 'emptyOutfit') {
    return  (
      <RelatecCardContainer data-testid="RelatedCard" onClick={outfit} >
        <EmptyTextContainer>
          <p>Click to add </p>
          <p>the viewed item </p>
          <p>to your outfit!</p>
        </EmptyTextContainer>
      </RelatecCardContainer>
    );
  }
  if (data.type === 'emptyRelated') {
    return  (
      <RelatecCardContainer data-testid="RelatedCard"  >
        <EmptyTextContainer>
          <p>Sorry, no </p>
          <p>related items. </p>
        </EmptyTextContainer>
      </RelatecCardContainer>
    );
  } else {
    return (
      <RelatecCardContainer data-testid="RelatedCard"  >
        <EmptyTextContainer>
          <p>Loading</p>
        </EmptyTextContainer>
      </RelatecCardContainer>
    )
  }

}




var cardHeight = 250;
const cardWidth = Math.round(cardHeight * 0.66).toString()
cardHeight = cardHeight.toString()
const borderRadius = '3';

const RelatecCardContainer = styled.div`
  display: flex;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 5px;
  flex-direction: column;
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  /* align-items: center; */
  justify-content: space-evenly;
  background-color: var(--bgc1);
  box-shadow: 1px 1px 5px rgba(0,0,0,0.15);
`



const CardFooter = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  width: ${cardWidth}px;
  flex-direction: column;
  justify-content: space-around;
  background-color: var(--bgc1);
  border-radius: ${borderRadius}px;
`


const CardFooterText = styled.p`
  font-size: var(--fs-2);
  margin-top: 7px;
  color: var(--fc-0);
`






const EmptyTextContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: var(--fs-2);
  color: var(--fc-0);
  background-color: var(--bgc1);


`


