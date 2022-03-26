import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks';
import {fetchCompany} from '../../Global/features/Employers/companies/company';
import './css/CompanyPage.css'

export default function CompanyPage() {
  const company = useAppSelector(state => state.company)
  const [dropdown,setDropdown] = useState(false)
  const dispatch = useAppDispatch()
  const {companyID} = useParams()

  useEffect(() => {
    dispatch(fetchCompany(Number(companyID)))
  },[companyID, dispatch])

  return (
    <div>
        {company.values?.banner ? <img src = {`${company.values?.banner}`} className = 'banner' alt = ''/> : null}
        <section className = 'companySection'>
            <section onMouseEnter = {() => setDropdown(true)} onMouseLeave = {() => setDropdown(false)}>
              <div className = 'kebabMenuIcon'/>
              <div className = 'containerDropdown'>
                {dropdown ? 
                  <div className = 'containerDropdownContent'>
                      <button className = 'dropdownBtn'>Edit</button>
                      <button className = 'deleteNavBtn'>Delete</button>
                  </div>
              : null}
              </div>
            </section>
            
            <div style = {{display: 'flex'}}>
                <h2 style = {{fontSize: '35px'}}>{company.values?.name}</h2>
                {company.values?.logo ? <img src = {`/media/${company.values?.logo}`} className = 'logo' alt = ''/> : null}
            </div>
        </section>

        <section className = 'companySection'>
          <label><h3>About:</h3></label>
          <hr className = 'mt-0-mb-4'/>
          <p>{company.values?.about}</p>
        </section>

        <section className = 'companySection'>
          <label><h3>Employer:</h3></label>
          <hr className = 'mt-0-mb-4'/>
          <p><i className = 'fa fa-phone icon'></i>000011111</p>
          <p><i className = 'icon'>&#9993;</i>{company.values?.email}</p>
        </section>

        <section className = 'companySection'>
        <label><h3>Information:</h3></label>
          <p>{company.values?.industry}</p>
         {company.values?.website ? <p>{company.values?.website}</p> : null}
        </section>

  
    </div>
  )
}
