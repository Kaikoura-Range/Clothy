import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { StateContext, DispatchContext } from '../../appState/index';
import api from '../../api/index.js'
import SearchBar from './SearchBar';


const Header = (props) => {
  const [state] = useContext(StateContext)
  const [, dispatch] = useContext(DispatchContext)
  const [searchedProducts, setSearchedProducts] = useState([]);


  const toggleTheme = () => {
    dispatch({
      type: 'TOGGLE_THEME',
    })
  }



  return (
    <HeaderContainer data-testid="Header" >
      <HeaderLogoContainer  >
        <LogoText> Clothy </LogoText>
      </HeaderLogoContainer>
      <HeaderCartContainer >
        <CartText onClick={toggleTheme} > Cart: {state.user.cart.length}  </CartText>
        <CartText> Outfit: {state.user.outfit.length}  </CartText>
        <SearchBar />
      </HeaderCartContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  top: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  position: sticky;
  background-Color: rgb(247, 193, 18);
  z-index: 1;
`

const HeaderLogoContainer = styled.div`
  left: 0;
  width: 200px;
  height: 100%;
  display: flex;
  position: absolute;
  align-Items: center;
  justify-Content: center;
  background-Color: rgb(247, 193, 18);;
`
const LogoText = styled.h2`
  color: white;
`

const HeaderCartContainer = styled.div`
  right: 0;
  width: 45%;
  height: 100%;
  display: flex;
  position: absolute;
  align-Items: center;
  justify-Content: space-evenly;
  background-Color: rgb(247, 193, 18);;
`

const CartText = styled.h3`
  color: white;
`

const HeaderSearchBar = styled.input`
  width: 45%;
  height: 75%;
  border-radius: 2px;
  background-color: var(--contain-bgc);
  padding-left: 1em;
`


export default Header