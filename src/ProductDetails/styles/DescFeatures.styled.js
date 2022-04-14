import styled from 'styled-components';

export const StyledDescFeaturesContainer = styled.div`
  background-color: var(--bgc-1);
  padding: 2.5em;
  color: #2f3640;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: var(--product-flex);

  h2 {
    background-color: #2f3640;
    border-radius: 0.3em;
    color: #fff;
    font-size: var(--header-fs);
    display:flex;
    justify-content: center;
    align-items:center;
    padding: 1em;
  }
`

export const StyledFeaturesContainer = styled.div`
  /* display: flex;
  justify-content: space-evenly;
  align-items: center; */
  p {
    color: var(--fc-1);
  }
`

export const StyledDescriptionContainer = styled.div`
  width: 45%;
  margin: 3em;

  p, h3 {
    color: var(--fc-1);
  }
`
