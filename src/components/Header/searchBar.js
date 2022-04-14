import React, { useState, useContext, useEffect, useRef } from 'react';
import { DispatchContext } from '../../appState/index.js'
import styled from 'styled-components';
import api from '../../api/index.js'
import SearchBarDropDown from './SearchBarDropDown.js'



const SearchBar = (props) => {
  const [selectable, setSelectable] = useState([]);
  const [searchValue, setSearchValue] = useState('')
  const [selected, setSelected] = useState(0)
  const [dropDown, setDropDown] = useState(false)
  const searchInput = useRef(null);
  const [, dispatch] = useContext(DispatchContext);


  useEffect(() => {
    if(searchValue.length) {
      setDropDown(true)
    }
  })


  const selectSearch = (e) => {
    const { key } = e
    if (key === 'ArrowDown') {
      selectable.length > selected && setSelected(selected + 1)
    }
    if (key === 'ArrowUp') {
      selected && setSelected(selected - 1)
    }
    if (key === 'Enter') {
      const { id } = selectable[selected]
      setSelected(0)
      setSearchValue('')
      setDropDown(false)
      api.load.newProduct(id, dispatch)
    }
    if (key === 'Escape') {
      searchInput.current.blur();
      setDropDown(false)
    }
  }



  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    api.search(e, 'name')
      .then(res => setSelectable(res))
  }


  const loadProduct = (id) => {
    return (e) => {
      setSelected(0)
      setSearchValue('')
      setDropDown(false)
      api.load.newProduct(id, dispatch)
    }
  }


  return (
    <SearchBarContainer data-testid="SearchBar" >
        <HeaderSearchBar
          value={searchValue}
          ref={searchInput}
          placeholder={`Search Products`}
          onChange={handleSearch}
          onKeyDown={selectSearch}
          onFocus={() => setDropDown(true)}
          onBlur={() => setDropDown(false)}
        />
        <SearchBarDropDown
          loadSelected={loadProduct}
          selected={selected}
          selectable={selectable}
          dropDown={dropDown}
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