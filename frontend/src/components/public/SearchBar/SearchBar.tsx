import React,{useState} from 'react'
import './css/SearchBar.css'

export default function SearchBar({placeholder = ''}) {
  const [searchVal, setSearchVal] = useState('')
  
  return (
    <form className = 'searchForm'>
        <input id = 'searchBar'
        type = 'search'
        placeholder = {placeholder}
        name = 'q'
        formMethod = 'get'
        onChange = {e => setSearchVal(e.target.value)}
        value = {searchVal}
        />
        <button id = 'searchBtn'>Search</button>
    </form>
  )
}
