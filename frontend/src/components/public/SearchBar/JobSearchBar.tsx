import React,{useState} from 'react'
import './css/SearchBar.css'

export default function JobSearchBar() {
  const [searchValue, setSearchVal] = useState({jobs: '', location: ''})

  return (
    <form className = 'searchForm'>
        <input id = 'searchBar'
        type = 'search'
        placeholder = 'Search jobs...'
        name = 'q'
        formMethod = 'get'
        onChange = {e => setSearchVal(prev => {return{...prev, jobs: e.target.value}})}
        value = {searchValue.jobs}
        />

        <input id = 'searchBar'
        type = 'search'
        placeholder = 'Search location...'
        name = 'l'
        formMethod = 'get'
        onChange = {e => setSearchVal(prev => {return{...prev, location: e.target.value}})}
        value = {searchValue.location}
        />
        <button id = 'searchBtn'>Search</button>
    </form>

  )
}
