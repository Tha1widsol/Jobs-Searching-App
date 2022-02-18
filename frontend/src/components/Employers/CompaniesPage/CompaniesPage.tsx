import React,{useEffect} from 'react'
import {fetchEmployer} from '../../Global/features/Employers/EmployersPage/employer'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import axios from 'axios'

export default function CompaniesPage() {
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get('/api/companies',{headers: {Authorization: `Token ${token}`}})
    .then(response => {
      console.log(response.data)
    })

  },[token])

  return (
    <div>
        <h1 className = 'title'>Companies</h1>
    </div>
  )
}
