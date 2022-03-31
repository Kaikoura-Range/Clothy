import { initializeAppState, addProductToOutfit } from '../methods.js'
import styled from 'styled-components';


const RelatedCard = ({ data, dispatch }) => {
  if (data.name) {
    const { category, description, name, id, slogan, updated_at, photos } = data;
    var photoUrl = photos.length ? photos[0].url : null;
    // console.log(photoUrl)
    return  (
      <RelatecCardContainer>
        {photoUrl ? <CardImage src={photoUrl} ></CardImage> : <EmptyCardImage ></EmptyCardImage>}
        <CardFooter>
          <CardFooterText>{name}</CardFooterText>
          <CardFooterButtonContainer>
            <CardFooterButton onClick={() => initializeAppState(dispatch, id)} >View product  </CardFooterButton>
            <CardFooterButton onClick={() => addProductToOutfit(dispatch, id)} >Add to outfit </CardFooterButton>
          </CardFooterButtonContainer>
        </CardFooter>
      </RelatecCardContainer>
    );
  }
  return  (
    <RelatecCardContainer>
      <p>name: </p>
      <p>slogan: </p>
      <p>category: </p>
    </RelatecCardContainer>
  );
}




const mainBackground = [230, 230, 230]
var cardHeight = 250;
const cardWidth = Math.round(cardHeight * 0.66).toString()
cardHeight = cardHeight.toString()
const borderRadius = '3';

const RelatecCardContainer = styled.div`
  display: flex;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 5px;
  width: ${cardWidth}px;
  height: ${cardHeight}px;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: rgb( ${mainBackground.toString()} );

`
const imgBackground = [235, 235, 235]
const CardImage = styled.img`
  height: 66%;
  display: flex;
  width: ${cardWidth}px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: rgb(${imgBackground.toString()});
`

const EmptyCardImage = styled.div`
  height: 100%;
  display: flex;
  width: ${cardWidth}px;
  border-top-left-radius: 9px;
  border-top-right-radius: 9px;
  background-color: rgb(${imgBackground.toString()});
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
  background-color: rgb(${mainBackground.toString()});
`


const CardFooterText = styled.p`
  font-size: 14px;
  margin-top: 7px;
`


const buttonBackground = [217, 217, 217]
const CardFooterButton = styled.button`
  width: 46%;
  height: 75%;
  font-size: 12px;
  border-radius: 5px;
  background-color: rgb(${buttonBackground.toString()});

`

const CardFooterButtonContainer = styled.div`
  width: ${cardWidth}px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgb(${mainBackground.toString()});
`



export default RelatedCard