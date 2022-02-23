import React,{useEffect} from 'react'
import {fetchCompanies} from '../../Global/features/Employers/Companies/companies'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import './css/CompaniesPage.css'

export default function CompaniesPage() {
  const dispatch = useAppDispatch()
  const companies = useAppSelector(state => state.companies.values)

  useEffect(() => {
    dispatch(fetchCompanies())
  },[dispatch])
  
  return (
    <div>
        <h1 className = 'title'>Companies</h1>
    </div>
  )
}
