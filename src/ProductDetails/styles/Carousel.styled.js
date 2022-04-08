import styled from 'styled-components';

export const StyledCarouselContainer = styled.div`
  background-image: url(${(({ photo }) => photo ? photo.url : '')});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 65%;

  &:hover {
    cursor: zoom-in;
  }

  button:hover {
    cursor: pointer;
  }
`

export const StyledCarouselPhotos = styled.span`
  background-image: url(${({src}) => src});
  background-size: cover;
  background-position: center;
  min-height: 60px;
  max-width: 60px;
  border-bottom: ${({ isActive }) => isActive ? '3px solid rgb(247,193,18);' : ''};
`

export const StyledThumbnailContainer = styled.div`
  display: flex;
  margin-left: 30px;
  margin-top: 30px;
  flex-direction: column;
  overflow: auto;
  height: 430px;
  width: 60px;

  &:hover {
    cursor: pointer;
  }
`

export const StyledArrowsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15%;

  button {
    width: 30px;
    height: 30px;
    font-size: var(--fs-2);
    font-weight: 400;
    border-radius: 50%;
    margin: 30px 30px 20px;
  }

`
export const StyledArrowButton = styled.button`
  visibility: ${({disabled}) => disabled ? 'hidden' : 'visible'}
`
