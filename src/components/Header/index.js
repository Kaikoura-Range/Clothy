import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { StateContext, DispatchContext } from '../../appState/index';
import api from '../../api/index.js'
import SearchBar from './searchBar.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart, faCircleHalfStroke } from '@fortawesome/free-solid-svg-icons'

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
      <HeaderDetailsContainer >
        <SearchBar />
        <DetailsText onClick={toggleTheme} ><FontAwesomeIcon icon={faCircleHalfStroke} /></DetailsText>
        <DetailsText ><FontAwesomeIcon icon={faHeart} />  {state.user.outfit.length}  </DetailsText>
        <DetailsText ><FontAwesomeIcon icon={faCartShopping} />  {state.user.cart.length}</DetailsText>
      </HeaderDetailsContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  top: 0;
  z-index: 1;
  width: 100%;
  height: 54px;
  display: flex;
  position: sticky;
  align-items: space-around;
  background-Color: var(--accent-color);
`

const HeaderLogoContainer = styled.div`
  height: 100%;
  display: flex;
  padding-left: 3%;
  align-Items: center;
  width: var(--header-logo-width);
`
const LogoText = styled.h2`
  color: var(--main-bgc);
  font-size: var(--logo-fs);
  font-family: 'Brush Script MT', cursive;
`

const HeaderDetailsContainer = styled.div`
  height: 100%;
  display: flex;
  padding-right: 2%;
  align-items: center;
  justify-content: end;
  width: var(--header-cart-width);
  `

const DetailsText = styled.h3`
  padding-left: 3%;
  color: var(--bgc-1);
`

export default Header
