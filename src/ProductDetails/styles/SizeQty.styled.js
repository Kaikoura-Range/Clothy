import styled from 'styled-components';

const StyledSizeQty = styled.div`
  margin-top: 0.3em;

  select, button {
    background-color: #f1f2f6;
    margin-right: 8px;
    text-transform: uppercase;
    background-color: var(--bgc-0);
    box-shadow: 0.5px 0.5px 0.5px rgba(0,0,0,0.08);

    &:hover {
      cursor: pointer;
    }
  }

  select {
    padding: 15px 30px 15px 40px;
  }

  p {
    color: red;
    font-size: 14px;
    display: inline-block;
    margin-bottom: 8px;
  }

  button {
    margin-top: 8px;
    padding: 15px 100px 15px 40px;
  }

  button:last-child {
    padding: 15px 8px;
  }
`

export default StyledSizeQty;


