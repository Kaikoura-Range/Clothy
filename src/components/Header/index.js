import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { StateContext, DispatchContext } from '../../appState/index';
import api from '../../api/index.js'
import SearchBar from './SearchBar';
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
        <DetailsText onClick={pageScroll} ><FontAwesomeIcon icon={faHeart} />  {state.user.outfit.length}  </DetailsText>
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
  position: sticky;
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
  font-size: 3em;
  color: var(--main-bgc);
  font-family: 'Brush Script MT', cursive;
`

const HeaderDetailsContainer = styled.div`
  right: 0;
  width: 40%;
  height: 100%;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: end;
  padding-right: 3%;
`

const DetailsText = styled.h3`
  padding-left: 5%;
  color: var(--main-bgc);
`

const HeaderSearchBar = styled.input`
  width: 45%;
  height: 72%;
  padding-left: 1em;
  border-radius: 2px;
  background-color: var(--contain-bgc);
`


export default Header
