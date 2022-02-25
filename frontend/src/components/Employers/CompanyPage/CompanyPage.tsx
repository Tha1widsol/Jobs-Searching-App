import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {CompanyProps} from './types';
import axios from 'axios'

export default function CompanyPage() {
  const [company,setCompany] = useState<CompanyProps>({user: {id: null,email: '',isHired: null,isAnEmployer: null},id: null, name: '',email: '',about: '', phone: '',logo: '',banner: '',industry: '',website: ''})
  const {companyID} = useParams()
  const token = localStorage.getItem('token')

  useEffect(() => {
    axios.get(`/api/company?id=${companyID}`,{
        headers: {
            Authorization:`Token ${token}`
        }
    })
    .then(response => {
        if (response.status === 200){
            const data = response.data
            setCompany(data)
        }
    })
    .catch(error => {
        if (error.response.status === 404) console.log('404')
    })

  },[companyID, token])

  return (
    <div>
        <p>{company.name}</p>
    </div>
  )
}
