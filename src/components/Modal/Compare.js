

import styled from 'styled-components';



const CompareModal = (props) => {

  return (
    <CompareContainer>
      <TestText>TEST</TestText>
    </CompareContainer>
  )
};

const CompareContainer = styled.div`
  width: 700px;
  height: 100px;
  display: flex;
  border-radius: 7px;
  align-Items: center;
  justify-Content: center;
  background-Color: rgb(250, 250, 250);
`

const TestText = styled.h1`
  color: rgb(20,20,20);
`

export default CompareModal