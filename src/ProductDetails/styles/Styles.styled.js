import styled from 'styled-components';

export const StylesImages = styled.img`
  width: 4em;
  height: 4em;
  object-fit: cover;
  border-radius: 50%;
  margin-right: 0.5em;
  margin-top: 0.5em;
  box-shadow: ${({active}) => active ? '1px 1px 5px rgba(0,0,0,0.18)' : ''};
  opacity: ${({active}) => active ? 1 : 0.6};
  transition: opacity 0.4s ease-in-out;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  &:active {
    opacity: 1;
  }
`

export const StylesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1em;
  width: 340px;
`
