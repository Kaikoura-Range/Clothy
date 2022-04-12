import React, { useState, useContext } from 'react';
import { DispatchContext } from '../../appState/index.js'
import styled from 'styled-components';
import api from '../../api/index.js'
import SearchBarDropDown from './SearchBarDropDown.js'

const searchCategories = [
  {name: 'name', id: 'name'},
  {name:'category', id: 'category'},
  // {name: 'id', id:'id'},
]

const SearchBar = (props) => {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [searchMethod, setSearchMethod] = useState('name')
  const [selected, setSelected] = useState(0)
  const [, dispatch] = useContext(DispatchContext);

  const selectSearch = (e) => {
    const { key } = e
    if (key === 'ArrowDown') {
      searchedProducts.length > selected && setSelected(selected + 1)
    }
    if (key === 'ArrowUp') {
      selected && setSelected(selected - 1)
    }
    if (key === 'Enter') {
      const { id } = searchedProducts[selected]
      setSelected(0)
      setSearchValue('')
      setSearchedProducts([])
      api.load.newProduct(id, dispatch)
    }
  }


  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    api.search(e, searchMethod)
      .then(res => setSearchedProducts(res))
  }


  const loadProduct = (id) => {
    return (e) => {
      setSelected(0)
      setSearchValue('')
      setSearchedProducts([])
      api.load.newProduct(id, dispatch)
    }
  }

  const loadSearchMethod = (id) => {
    return (e) => {
      setSelected(0)
      setSearchValue('')
      setSearchedProducts([])
      setSearchMethod(id)
    }
  }



  const selectable = searchedProducts.length ? searchedProducts : searchCategories
  const loadSelected = searchedProducts.length ? loadProduct : loadSearchMethod
  return (
    <SearchBarContainer data-testid="SearchBar" >
        <HeaderSearchBar
          value={searchValue}
          placeholder={`Search Products by ${searchMethod}`}
          onChange={handleSearch}
          onKeyDown={selectSearch}
        />
        <SearchBarDropDown
          loadSelected={loadSelected}
          selected={selected}
          selectable={selectable}
        />
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