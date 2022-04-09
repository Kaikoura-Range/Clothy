import styled from 'styled-components';

export const StylesImages = styled.img`
  width: 4.5em;
  height: 4.5em;
  object-fit: cover;
  border-radius: 50%;
  margin: 5px;
  box-shadow: 1px 1px 5px rgba(0,0,0,0.18);
  opacity: 0.8;
  transition: opacity 0.4s ease-in-out;

  &:hover {
    opacity: 1;
  }

  &:active {
    opacity: 1;
  }
`

export const StylesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 70px 20px 70px;
  width: 340px;
`
