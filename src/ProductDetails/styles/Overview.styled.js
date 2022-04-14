import styled from 'styled-components';

export const ProductOverviewContainer = styled.div`
  display: flex;
  min-height: ${({ minHeight }) =>  minHeight.toString() + 'px'};
  flex-direction: var(--product-flex);
`

export const ProductInfoContainer = styled.div`
  display: flex;
  min-width: 30%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledOverviewContainer = styled.div`
  margin-bottom: 0.3em;

  span {
    display: inline-block;
    text-transform: uppercase;
  }
`

export const StarsReviewContainer = styled.div`
  display: flex;
  margin-top: 2em;
`

export const StyledPrice = styled.p`
  span {
    margin: 0.5em 0.7em 0 0;
  }

  span:last-child {
    text-decoration: ${({ salePrice }) => salePrice ? 'line-through' : 'none'};
  }

  span:first-child {
    color: ${({ salePrice }) => salePrice ? 'red' : '' };
  }
`

export const StyledCurrentStyle = styled.p`
  span {
    text-transform: uppercase;
    font-weight: 900;
    margin-top: 2em;
    margin-right: 0.2em;
    background-color: var(--accent-color);
    border-radius: 1em;
    padding: 0 0.6em;
    font-size: var(--fs-1);
  }
`

export const StyledCategory = styled.span`
  margin-top: 2em;
  margin-bottom: 0.2em;
  font-size: var(--fs-2);
`

export const StyledReviews = styled.p`
  &:active, &:hover {
    text-decoration: underline;
  }

  padding: 0.1em 1em;

  text-decoration: none;
  font-size: var(--fs-2);
  color: var(--fc-0);
`