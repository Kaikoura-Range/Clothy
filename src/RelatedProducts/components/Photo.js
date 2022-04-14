import React from 'react';
import styled, { keyframes, css } from 'styled-components';


const fadeTime = 400;


const Photo = ({ src, onClick, animate, scrollDown, scrollUp, action, outfit }) => {

  const usedSrc = src.thumbnail_url || src.url;
   return usedSrc ? (
    <CardImageContainer animate={animate}>
      <CardImage
        src={usedSrc}
        data-testid="nav"
        decoding="async"
        onClick={onClick}
        loading="lazy"
        alt='Clothing styles'
      />
      <OutfitActionButton aria-label={action} data-testid="outfit" onClick={outfit} >{`${action}`}</OutfitActionButton>
      {scrollDown ? <ScrollButton aria-label="scroll image" data-testid="scroll" direction="left"  onClick={scrollDown} >{`<`}</ScrollButton> :  <HiddenScroll>{'<'}</HiddenScroll>}
      {scrollUp ? <ScrollButton aria-label="scroll image" data-testid="scroll" direction="right"  onClick={scrollUp} >{`>`}</ScrollButton> : <HiddenScroll>{'>'}</HiddenScroll>}
    </CardImageContainer>

    )
    :
    (
      <EmptyCardImage onClick={onClick} data-testid="nav"  />
    )
}


const fadeOptions = `${fadeTime}ms ease forwards`


const fade = keyframes`
0% {
  opacity: 1;
}
50% {
  opacity: 0.2;
}
100% {
  opacity: 1
}
`;



var imgHeight = 14;
const imgWidth = (imgHeight * 0.8).toString()
imgHeight = imgHeight.toString()

const CardImageContainer = styled.div`
  position: relative;
  width: ${imgWidth}em;
  height: ${imgHeight}em;
  background-color: var(--bgc1);
  animation: ${({ animate }) => animate &&  css`${fade} ${fadeOptions}`};

`



const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  &:hover {
    opacity: 0.97;
    cursor: pointer;
  }
`

const EmptyCardImage = styled.div`
  display: flex;
  width: ${imgWidth}px;
  height: ${imgHeight}em;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: var(--bgc1);
`


const sideMargin = '0.9'

const OutfitActionButton = styled.button`
  top: 1em;
  right: 0.5em;
  padding: 5px;
  opacity: 0.65;
  color: var(--fc-0);
  border-radius: 5px;
  position: absolute;
  font-size: var(--fs-2);
  background-color: var(--bgc-1);
  &:hover {
    opacity: .9;
    cursor: pointer;
  }

`



const ScrollButton = styled.button`
  padding: 7px;
  bottom: 0.9em;
  opacity: 0.85;
  color: var(--fc-0);
  font-weight: bold;
  padding-left: 10px;
  border-radius: 50%;
  position: absolute;
  padding-right: 10px;
  font-size: var(--fs0);
  background-color: var(--bgc-1);
  left: ${({ direction }) => direction === 'left' && css`${sideMargin}em` };
  right: ${({ direction }) => direction === 'right' && css`${sideMargin}em` };

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  &:active {
    opacity: 1;
  }

`



const HiddenScroll = styled.button`
  opacity: 0;
  height: 75%;
  padding: 7px;
  font-weight: bold;
  font-size: var(--fs-2);

`




export default Photo