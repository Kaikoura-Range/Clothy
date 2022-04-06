import styled from 'styled-components';

export const StyledCarouselContainer = styled.div`
  background-image: url(${(({ photo }) => photo ? photo.url : '')});
  background-size: cover;
  width: 65%;
  height: auto;
`

export const StyledCarouselPhotos = styled.img`
  height: 70px;
  width: 70px;
  object-fit: cover;
  border: ${({ isActive }) => isActive ? '1rem solid red' : ''};
`

export const StyledArrowsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    width: 50px;
    height: 50px;
    font-size: 18px;
    font-weight: 800;
    border-radius: 50%;
    margin: 20px;
  }
`
