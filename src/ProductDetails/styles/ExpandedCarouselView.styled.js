import styled from 'styled-components';

export const StyledExpandedViewModal = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.35);
`
export const StyledExpandedViewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  width: 97%;
  height: 95%;
  padding-bottom: 20px;
  background-color: #fff;
  background-image: url(${({bgImg}) => bgImg });
  background-size: cover;
  border-radius: 0.5%;
  overflow: hidden;
`

export const ZoomedImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform .1s;

  &:hover {
    -ms-transform: scale(2.5) translate(30px);
    -webkit-transform: scale(2.5) translate(30px);
    transform: scale(2.5) translate(30px);
  }
`

export const StyledDotImage = styled.div`
  width: 1em;
  height: 1em;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${({activeDot}) => activeDot ? 'red' : '#fff' };
`