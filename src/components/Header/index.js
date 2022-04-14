import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { StateContext, DispatchContext } from '../../appState/index';
import api from '../../api/index.js'
import SearchBar from './SearchBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faHeart, circleHalfStroke } from '@fortawesome/free-solid-svg-icons'

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
    const body = document.getElementById('root')
    console.log('body', body)
    const height = body.offsetHeight
    console.log('height', height)
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
        <DetailsText onClick={pageScroll} ><FontAwesomeIcon icon={faHeart} />  {state.user.outfit.length}  </DetailsText>
        <DetailsText onClick={toggleTheme} ><FontAwesomeIcon icon={faCartShopping} />  {state.user.cart.length}</DetailsText>
      </HeaderDetailsContainer>
    </HeaderContainer>
  )
}

const HeaderContainer = styled.div`
  top: 0;
  z-index: 1;
  width: 100%;
  height: 56px;
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
  font-size: 3em;
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
  color: white;
  padding-left: 5%;
`

const HeaderSearchBar = styled.input`
  width: 45%;
  height: 75%;
  padding-left: 1em;
  border-radius: 2px;
  background-color: var(--contain-bgc);
`


export default Header
