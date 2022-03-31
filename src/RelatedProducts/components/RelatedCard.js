import { initializeAppState, addProductToOutfit } from '../methods.js'
import styled from 'styled-components';


const RelatedCard = ({ data, dispatch }) => {
  if (data.name) {
    const { category, description, name, id, slogan, updated_at } = data;
    return  (
      <RelatecCardContainer>
        <CardImage></CardImage>
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
const imgPercent = '75';

const RelatecCardContainer = styled.div`
  width: 200px;
  height: 300px;
  padding: 3px;
  display: flex;
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 9px;
  align-items: center;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: rgb(${mainBackground.toString()});

`
const imgBackground = [235, 235, 235]
const CardImage = styled.div`
  width: 100%;
  height: 210px;
  display: flex;
  /* height: ${imgPercent}%; */
  background-color: rgb(${imgBackground.toString()});
`

const CardFooter = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  border-radius: 7px;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  /* height: ${1 - imgPercent}%; */
  background-color: rgb(${mainBackground.toString()});
`


const CardFooterText = styled.p`
  font-size: 16px;
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
  width: 100%;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgb(${mainBackground.toString()});
`



export default RelatedCard