import { useState, useEffect } from 'react';
import styled from 'styled-components';


export const RelatedCard = ({ data, outfit, nav, action }) => {
  data.photos = data.photos || []
  // console.log(data)
  const [photoIndex, setPotohIndex] = useState(0)
  const [canScrollUp, setScrollUp] = useState(true)
  const [canScrollDown, setScrollDown] = useState(false)
  const { name, photos } = data;

  useEffect(() => {
    if (photos.length === photoIndex + 1 ) {
      setScrollUp(false)
      setScrollDown(true)
    }
    if (photos.length > photoIndex > 0) {
      !canScrollUp && setScrollUp(true)
      !canScrollDown && setScrollDown(true)
    }
    if (photoIndex === 0) {
      setScrollUp(true)
      setScrollDown(false)
    }
  }, [photoIndex, canScrollUp, canScrollDown, photos.length])


  if ( data.type === 'render') {

    const scrollUp = () => {
      if (canScrollUp) {
        setPotohIndex(photoIndex + 1)
      }
    }
    const scrollDown = () => {
      if (canScrollDown) {
        setPotohIndex(photoIndex - 1)
      }
    }

    return  (
      <RelatecCardContainer data-testid="RelatedCard" >
        {photos[photoIndex] ? <CardImage src={photos[photoIndex].url} onClick={nav} data-testid="nav" ></CardImage> : <EmptyCardImage onClick={nav} data-testid="nav"  ></EmptyCardImage>}
        <CardFooter>
          <CardFooterText>{name}</CardFooterText>
          <CardFooterButtonContainer>
            {canScrollDown ?  <ScrollButton data-testid="scroll" onClick={scrollDown} >{`<`}</ScrollButton> :  <NoScrollButton>X</NoScrollButton>}
            <CardFooterButton data-testid="outfit" onClick={outfit} >{`${action} outfit`}</CardFooterButton>
            {canScrollUp ? <ScrollButton data-testid="scroll" onClick={scrollUp} >{`>`}</ScrollButton> : <NoScrollButton>X</NoScrollButton>}
          </CardFooterButtonContainer>
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



const bgVar = '--bgc1:'


const mainBackground = [240, 240, 240]
var cardHeight = 250;
const cardWidth = Math.round(cardHeight * 0.66).toString()
cardHeight = cardHeight.toString()
const borderRadius = '3';

const RelatecCardContainer = styled.div`
  display: flex;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 5px;
  align-items: center;
  flex-direction: column;
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  justify-content: space-evenly;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.15);
  background-color: var(--bgc1);

`
const imgBackground = [235, 235, 235]
const CardImage = styled.img`
  height: 66%;
  display: flex;
  width: ${cardWidth}px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  /* background-color: var(${bgVar}); */
  background-color: var(--bgc1);

`

const EmptyCardImage = styled.div`
  height: 100%;
  display: flex;
  width: ${cardWidth}px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  /* background-color: var(${bgVar}); */
  background-color: var(--bgc1);

`
// 772 / 514

const CardFooter = styled.div`
  height: 90px;
  display: flex;
  width: ${cardWidth}px;
  border-radius: ${borderRadius}px;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  /* background-color: rgb(${mainBackground.toString()}); */
  /* background-color: var(${bgVar}); */
  background-color: var(--bgc1);


`


const CardFooterText = styled.p`
  font-size: var(--fs-2);
  margin-top: 7px;
  color: var(--fc-0);
`


const CardFooterButton = styled.button`
  height: 75%;
  padding: 5px;
  font-size: var(--fs-2);
  color: var(--fc-0);
  border-radius: 5px;
  /* background-color: var(${bgVar}); */
  background-color: var(--bgc-1);


`


const ScrollButton = styled.button`
  height: 75%;
  padding: 7px;
  font-size: var(--fs-2);
  color: var(--fc-0);
  border-radius: 5px;
  font-weight: bold;
  /* background-color: var(${bgVar}); */
  background-color: var(--bgc-1);


`

// const ScrollButton = styled.button`
//   height: 75%;
//   padding: 7px;
//   font-size: 12px;
//   border-radius: 5px;
//   font-weight: bold;
//   color: white;
//   background-color: rgba(247, 193, 18, 0.5);

// `

const NoScrollButton = styled.button`
  /* color: white; */
  color: rgba(251, 123, 111, 1);
  font-size: 14px;
  font-weight: bold;
  height: 75%;
  padding: 7px;
  font-size: 12px;
  border-radius: 5px;
  background-color: rgba(251, 123, 111, 0.7);
  /* background-color: var(${bgVar}); */
  /* background-color: var(--bgc1); */
  background-color: var(--bgc-1);


`


const CardFooterButtonContainer = styled.div`
  width: ${cardWidth}px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  /* background-color: rgb(${mainBackground.toString()}); */
  /* background-color: var(${bgVar}); */
  background-color: var(--bgc1);

`


const EmptyTextContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: var(--fs-2);
  color: var(--fc-0);
  /* background-color: var(${bgVar}); */
  background-color: var(--bgc1);


`


