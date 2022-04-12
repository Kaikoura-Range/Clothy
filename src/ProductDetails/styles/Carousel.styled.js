import styled from 'styled-components';

export const StyledCarouselContainer = styled.div`
  background-image: url(${(({ photo }) => photo ? photo.url : '')});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  /* width: 65%; */
  width: var(--product-carousel-width);

  &:hover {
    cursor: zoom-in;
  }

  button:hover {
    cursor: pointer;
  }
`


export const ThumbnailCarouselContainer = styled.div`
  margin-left: 4em;

  button {
    margin-left: 1.2em;
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
height: 430px;
width: 60px;
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
  margin-bottom: 0.2em;
  border-radius: 5px;
`

export const StyledArrowsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15%;

  button {
    width: 2.3em;
    height: 2.3em;
    font-size: var(--fs-2);
    font-weight: 400;
    border-radius: 50%;
    margin: 3em 4em;
    opacity: 0.8;
    transition: opacity 0.4s ease-in-out;
  }

  button:hover {
    opacity: 1;
  }
`
export const StyledArrowButton = styled.button`
  animation: 3s slidein;
  visibility: ${({disabled}) => disabled ? 'hidden' : 'visible'}
`

export const ExpandButtonContainer = styled.div`
  display: flex;
  justify-content: end;
`

export const StyledExpandButton = styled.button`
  padding: 5px;
  opacity: 0.8;
  border-radius: 5px;
  font-size: var(--fs-2);
  color: var(--fc-0);
  background-color: var(--bgc-1);
  transition: opacity 0.4s ease-in-out;
  margin-top: 3em;
  margin-right: 4em;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }
`
