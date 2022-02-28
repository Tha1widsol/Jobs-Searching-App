import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks';
import {fetchCompany} from '../../Global/features/Employers/Companies/company';

export default function CompanyPage() {
  const company = useAppSelector(state => state.company)
  const dispatch = useAppDispatch()
  const {companyID} = useParams()

  useEffect(() => {
    dispatch(fetchCompany(Number(companyID)))
  },[companyID, dispatch])

  return (
    <div>
        <p>{company.values?.name}</p>
    </div>
  )
}
