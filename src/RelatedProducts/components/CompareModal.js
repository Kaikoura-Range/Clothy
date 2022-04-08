// import { useState, useEffect } from 'react';
import styled from 'styled-components';



const CompareModal = ({ currentProductData }) => {
  console.log(currentProductData)
  return (
    <CompareModalContainer id="CompareModal" >
      <CompareContent>
       Hello {currentProductData.id}
      </CompareContent>
    </CompareModalContainer>
  )
}



const compareProducts = (dataToCompare) => {
  const compare = document.getElementById("CompareModal");
  console.log(compare)
  console.log(dataToCompare)
}


const CompareModalContainer = styled.dialog`
  width: 100%;
  height: 100%;
  /* padding: 1em; */
  /* opacity: 0.5; */
  display: flex;
  align-items: center;
  justify-content: center;
  &::backdrop {
    background-Color: rgba(0, 0, 0, 0.2);
  }
`


const CompareContent = styled.div`
  /* width: 90%; */
  height: 10em;
  width: 10em;
  padding: 1em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-Color: var(--main-bgc);
  color: var(--body-tc);
`




export default CompareModal;