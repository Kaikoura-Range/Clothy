import React, { useState, useContext, useEffect, useRef } from 'react';
import { DispatchContext } from '../../appState/index.js'
import styled from 'styled-components';
import api from '../../api/index.js'
import SearchBarDropDown from './SearchBarDropDown.js'

const searchCategories = [
  {name: 'name', id: 'name', method: true},
  {name:'category', id: 'category', method: true},
]

const SearchBar = (props) => {
  const [selectable, setSelectable] = useState(searchCategories);
  const [searchValue, setSearchValue] = useState('')
  const [searchMethod, setSearchMethod] = useState('name')
  const [selected, setSelected] = useState(0)
  const [dropDown, setDropDown] = useState(false)
  const searchInput = useRef(null);
  const [, dispatch] = useContext(DispatchContext);


  useEffect(() => {
    if (searchValue.length === 0) {
      setSelectable(searchCategories)
    } else {
      setDropDown(true)
    }
  }, [searchValue])


  const selectSearch = (e) => {
    const { key } = e
    const { id, method } = selectable[selected]
    if (key === 'ArrowDown') {
      selectable.length > selected && setSelected(selected + 1)
      if (method) {
        setSearchMethod(id)
      }
    }
    if (key === 'ArrowUp') {
      selected && setSelected(selected - 1)
      if (method) {
        setSearchMethod(id)
      }
    }
    if (key === 'Enter') {
      if(method) {
        setSearchMethod(id)
      } else {
        setDropDown(false)
        setSelected(0)
        setSearchValue('')
        api.load.newProduct(id, dispatch)
      }
    }
    if (key === 'Escape') {
      searchInput.current.blur();
      setDropDown(false)
    }
  }



  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    api.search(e, searchMethod)
      .then(res => {
        const next = res.length ? res : searchCategories
        setSelectable(next)
      })
  }


  const loadProduct = (id) => {
    return (e) => {
      setSelected(0)
      setSearchValue('')
      setDropDown(false)
      searchInput.current.blur();
      api.load.newProduct(id, dispatch)
    }
  }

  const loadSearchMethod = (id) => {
    return (e) => {
      setDropDown(false)
      setSearchMethod(id)
    }
  }

  const loadSelected = selectable[0].method ? loadSearchMethod : loadProduct
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
          loadSelected={loadSelected}
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