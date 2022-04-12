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
  function pageScroll() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
     });
  }


  return (
    <HeaderContainer data-testid="Header" >
      <HeaderLogoContainer  >
        <LogoText> Clothy </LogoText>
      </HeaderLogoContainer>
      <HeaderDetailsContainer >
        <SearchBar />
        <DetailsText onClick={toggleTheme} > Cart: {state.user.cart.length}  </DetailsText>
        <DetailsText onClick={pageScroll} > Outfit: {state.user.outfit.length}   </DetailsText>
      </HeaderDetailsContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  top: 0;
  z-index: 1;
  width: 100%;
  height: 50px;
  position: sticky;
  z-index: 1;
  background-Color: var(--accent-color);
`

const HeaderLogoContainer = styled.div`
  left: 0;
  width: 60%;
  height: 100%;
  display: flex;
  padding-left: 3%;
  position: absolute;
  align-Items: center;
`
const LogoText = styled.h2`
  color: white;
`

const HeaderDetailsContainer = styled.div`
  right: 0;
  width: 40%;
  height: 100%;
  display: flex;
  position: absolute;
  align-Items: center;
  justify-Content: space-evenly;
`

const DetailsText = styled.h3`
  color: white;
`

const HeaderSearchBar = styled.input`
  width: 45%;
  height: 75%;
  padding-left: 1em;
  border-radius: 2px;
  background-color: var(--contain-bgc);
`


export default Header