import styled from 'styled-components';

export const StyledDescFeaturesContainer = styled.div`
  display: flex;
  color: #2f3640;
  padding: 2.5em;
  align-items: center;
  padding-left: 1.5em;
  padding-right: 1.5em;
  justify-content: space-around;
  background-color: var(--bgc-1);
  flex-direction: var(--product-flex);

`

export const StyledDescFeatureHeader = styled.div`
  display: flex;
  align-items:center;
  margin-bottom: 0.5em;
  border-radius: 0.3em;
  justify-content: center;
  background-color: #2f3640;
  h2 {
    padding: 1em;
    color: #fff;
    font-size: var(--header-fs);
  }

`


export const StyledFeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  p {
    color: var(--fc-1);
  }
`

export const StyledDescriptionContainer = styled.div`
  margin: 0.5em;
  max-width: 55%;
  p, h3 {
    color: var(--fc-1);
  }
`
