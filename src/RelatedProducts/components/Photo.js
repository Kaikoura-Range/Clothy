// import { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';


const fadeTime = 400;


const Photo = ({ src, onClick, animate, scrollDown, scrollUp, canScrollUp, canScrollDown, action, outfit }) => {
  // const [hovered, setHoverd] = useState(false);
  // const shortText = action.includes('Add') ? '+' : '-';
  // console.log(hovered)
  // console.log(shortText)
   return src ? (
    <CardImageContainer animate={animate} >
      <CardImage
        src={src}
        data-testid="nav"
        decoding="async"
        onClick={onClick}
        // loading="eager"
      />
      {/* <OutfitActionButton data-testid="outfit" onClick={outfit} >{`${shortText}`}</OutfitActionButton> */}
      <OutfitActionButton data-testid="outfit" onClick={outfit} >{`${action}`}</OutfitActionButton>

      {canScrollDown ? <ScrollButton data-testid="scroll" direction="left"  onClick={scrollDown} >{`<`}</ScrollButton> :  <HiddenScroll>{'<'}</HiddenScroll>}
      {canScrollUp ? <ScrollButton  data-testid="scroll" direction="right"  onClick={scrollUp} >{`>`}</ScrollButton> : <HiddenScroll>{'>'}</HiddenScroll>}
    </CardImageContainer>

    )
    :
    (
      <EmptyCardImage onClick={onClick} data-testid="nav"  />
    )
}


//onHover={(e) => e.stopPropagation()}
// const fadeTime = 300;
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

// var cardHeight = 250;
// const cardWidth = Math.round(cardHeight * 0.66).toString()
// cardHeight = cardHeight.toString()
// 208 165

var imgHeight = 14;
const imgWidth = (imgHeight * 0.8).toString()
imgHeight = imgHeight.toString()

const CardImageContainer = styled.div`
  height: ${imgHeight}em;
  position: relative;
  /* width: 100%; */
  width: ${imgWidth}em;
  /* border-top-left-radius: 5px; */
  /* border-top-right-radius: 5px; */

  background-color: var(--bgc1);
  animation: ${({ animate }) => animate &&  css`${fade} ${fadeOptions}`};

`



const CardImage = styled.img`
  height: 100%;
  width: 100%;
  /* border-top-left-radius: 5px; */
  /* border-top-right-radius: 5px; */
  /* object-fit: none; */
  /* object-fit: fill; */
  /* object-fit: scale-down; */
  object-fit: cover;
  /* object-fit: contain; */
  &:hover {
    opacity: 0.97;
    cursor: pointer;
  }
`

const EmptyCardImage = styled.div`
  height: 100%;
  display: flex;
  width: ${imgWidth}px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: var(--bgc1);
`


const sideMargin = '0.9'


// const OutfitActionButton = styled.button`
//   top: 1em;
//   right: ${sideMargin}em;
//   padding: 6px;
//   padding-left: 9px;
//   padding-right: 9px;
//   font-weight: bold;
//   opacity: 0.85;
//   border-radius: 50%;
//   position: absolute;
//   font-size: var(--fs1);

//   /* color: var(--fc-0); */
//   /* background-color: var(--bgc-1); */

//   color: var(--accent-color);
//   background-color: rgba(0, 0, 0, .75);

//   &:hover {
//     opacity: .9;
//     cursor: pointer;
//   }

// `


const OutfitActionButton = styled.button`
  top: 1em;
  right: 0.5em;
  padding: 5px;
  opacity: 0.65;
  border-radius: 5px;
  position: absolute;
  font-size: var(--fs-2);

  color: var(--fc-0);
  background-color: var(--bgc-1);

  /* color: var(--accent-color);
  background-color: rgba(0, 0, 0, .75); */


  &:hover {
    opacity: .9;
    cursor: pointer;
  }

`



const ScrollButton = styled.button`
  opacity: 0.85;
  padding: 7px;
  bottom: 0.9em;
  padding-left: 10px;
  padding-right: 10px;
  font-weight: bold;
  border-radius: 50%;
  position: absolute;
=  font-size: var(--fs0);
  /* color: var(--accent-color); */
  color: var(--fc-0);
  background-color: var(--bgc-1);
  /* background-color: rgba(0, 0, 0, .75); */

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