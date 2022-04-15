import styled, {keyframes, css} from 'styled-components';

const toggleIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`


export const StyledCarouselContainer = styled.div`
  background-image: url(${(({ photo }) => photo ? photo.url : '')});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  width: ${({width}) =>  css`${width}px`};
  height: ${({height}) =>  css`${height}px`};
  animation: ${({animation}) => animation && css`${toggleIn} 0.5s ease-in-out`};
  position: relative;

  &:hover {
    cursor: zoom-in;
  }

  button:hover {
    cursor: pointer;
  }
`


export const StyledCarouselBackground = styled.div`
  background-color: rgb(110, 110, 110);

`


export const ThumbnailCarouselContainer = styled.div`
  /* margin-left: 4em; */
  margin-left: 5%;
  button {
    width: 2em;
    height: 2em;
    font-size: var(--fs-2);
    font-weight: 400;
    border-radius: 50%;
    opacity: 0.8;
    transition: opacity 0.4s ease-in-out;
  }

  button:first-of-type {
    margin-bottom: 1em;
  }

  button:last-of-type {
    margin-top: 1em;
  }
`

export const StyledThumbnailContainer = styled.div`
display: flex;
flex-direction: column;
overflow: auto;
height: 450px;
width: 70px;
box-shadow: 1px 1px 5px rgba(0,1em,1em,0.5);

&:hover {
  cursor: pointer;
}
`

export const StyledCarouselPhotos = styled.span`
  background-image: url(${({src}) => src});
  background-size: cover;
  background-position: bottom;
  min-height: 60px;
  max-width: 60px;
  border-bottom: ${({ isActive }) => isActive ? '3px solid rgb(247,193,18);' : ''};
  margin-left: ${({ isActive }) => isActive ? '10px' : ''};
  margin-bottom: 0.2em;
  border-radius: 5px;
  transition: all 0.3s ease-in;
`

export const StyledArrowsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  width: 100%;
  bottom: 0;
  button {
    width: 2.3em;
    height: 2.3em;
    font-size: var(--fs-2);
    font-weight: 400;
    border-radius: 50%;
    margin: 5% 6%;
    opacity: 0.8;
    transition: opacity 0.4s ease-in-out;
  }

  button:hover {
    opacity: 1;
  }
`
export const StyledArrowButton = styled.button`
  animation: 3s slidein;
  visibility: ${({disabled}) => disabled ? 'hidden' : 'visible'};
`

export const ExpandButtonContainer = styled.div`
  display: flex;
  position: absolute;
  top: 0;
  right: 0;
  width: 10%;
  justify-content: end;
  padding-top: 5%;
  padding-right: 6%;
`

export const StyledExpandButton = styled.button`
  padding: 5px;
  opacity: 0.8;
  border-radius: 5px;
  font-size: var(--fs-2);
  color: var(--fc-0);
  background-color: var(--bgc-1);
  transition: opacity 0.4s ease-in-out;


  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
