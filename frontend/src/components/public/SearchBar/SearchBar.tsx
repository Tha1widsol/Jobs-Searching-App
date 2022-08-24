import axios from 'axios'
import {token} from '../../Global/features/Auth/user'
import React,{useState, useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../../Global/features/hooks'
import { fetchMatchingJobs, setMatchingJobs } from '../../Global/features/Jobseekers/matchingJobs/matchingJobs'
import './css/SearchBar.css'

export default function SearchBar({isAnEmployer = false}) {
  const [searchVal, setSearchVal] = useState('')
  const dispatch = useAppDispatch()

  function handleSubmitForm(e: React.SyntheticEvent){
    e.preventDefault()
    axios.get(`/api/searchJobs?q=${searchVal}`,{
        headers: {
            Authorization: `Token ${token}`
        }
    })
    .then(response => {
        if (response.status === 200) dispatch(setMatchingJobs(response.data))
    })
  }

  return (
    <form onSubmit = {handleSubmitForm}>
        <input id = 'searchBar'
        placeholder = {isAnEmployer ? 'Search candidates...' : 'Search jobs...'}
        name = 'q'
        formMethod = 'get'
        onChange = {e => setSearchVal(e.target.value)}
        value = {searchVal}
        />
        <button id = 'searchBtn'>Search</button>
    </form>
  )
}
