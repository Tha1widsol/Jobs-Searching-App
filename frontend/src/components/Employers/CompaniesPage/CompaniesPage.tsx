import React,{useState,useEffect} from 'react'
import {fetchCompanies} from '../../Global/features/Employers/Companies/companies'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import './css/CompaniesPage.css'

export default function CompaniesPage() {
  const dispatch = useAppDispatch()
  const [dropdown,setDropdown] = useState(false)
  const companies = useAppSelector(state => state.companies.values)

  useEffect(() => {
    dispatch(fetchCompanies())
  },[dispatch])
  
  return (
    <div>
        <h1 className = 'title'>Companies</h1>
        {companies.map((company,index) => {
          return (
            <div className = 'companyContainer' key = {index}>
              <section onMouseEnter = {() => setDropdown(true)} onMouseLeave = {() => setDropdown(false)}>
                <div className = 'kebabMenuIcon'/>
                <div className = 'containerDropdown'>
                  {dropdown ? 
                    <div className = 'containerDropdownContent'>
                        <button className = 'editNavBtn'>Edit</button>
                        <button className = 'deleteNavBtn'>Delete</button>
                    </div>
                : null}
                </div>
              </section>

              <section style = {{display: 'flex'}}>
                 <h2>{company.name}</h2>
                 {company.logo ? <img className = 'logo' src = {company.logo} alt = ''/> : null} 
              </section>

              <hr className = 'mt-0-mb-4'/>
              <p><i className = 'fa fa-phone icon'></i>000011111</p>
              <p><i className = 'icon'>&#9993;</i>{company.user.email}</p>
              {company.website ? <a href = {company.website} target = '_blank' rel = 'noreferrer'><p>Website: {company.website}</p></a> : null}
              <hr className = 'mt-0-mb-4'/>

              <section style = {{display: 'flex'}}>
                <button>View</button> 
                <button>Post Job</button>
              </section>
            </div>
          )
        })}
    </div>
  )
}
