import styled from 'styled-components';

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 7em;
  justify-content: center;
`

export const StyledOverviewContainer = styled.div`
  margin-bottom: 0.3em;

  span {
    display: inline-block;
    text-transform: uppercase;
  }
`

export const StyledPrice = styled.p`
  span {
    margin: 8px 10px 0 0;
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
    font-weight: 700;
    margin-top: 30px;
  }
`

export const StyledCategory = styled.span`
  margin-bottom: 10px;
  font-size: var(--fs-2);
`