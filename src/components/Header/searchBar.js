import React, { useState } from 'react';
import styled from 'styled-components';
import api from '../../api/index.js'
import SearchBarDropDown from './SearchBarDropDown.js'


const SearchBar = (props) => {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [searchMethod, setSearchMethod] = useState('category')


  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    api.search(e, searchMethod)
      .then(res => {
        // console.log('search res', res)
        setSearchedProducts(res)
      })
  }

  const onLoad = (newValue) => {
    setSearchedProducts(newValue)
    setSearchValue('')
  }

  return (
    <SearchBarContainer data-testid="SearchBar" >
        <HeaderSearchBar  value={searchValue} placeholder={`Search Products by ${searchMethod}`} onChange={handleSearch}  />
        <SearchBarDropDown products={searchedProducts} onLoad={onLoad}/>
    </SearchBarContainer>
  )
}


const SearchBarContainer = styled.div`
  width: 45%;
  height: 75%;
  position: relative;
`


const HeaderSearchBar = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background-color: var(--contain-bgc);
  padding-left: 1em;
`


export default SearchBar