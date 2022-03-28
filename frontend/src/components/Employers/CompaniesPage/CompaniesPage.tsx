import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {fetchCompanies} from '../../Global/features/Employers/companies/companies'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'

export default function CompaniesPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [dropdown,setDropdown] = useState<number | null>(null)
  const companies = useAppSelector(state => state.companies.values)

  useEffect(() => {
    dispatch(fetchCompanies()).then(response => {
      if (response.meta.requestStatus === 'rejected') {
        navigate('/create-company')
        window.location.reload()
      }
    })
  },[dispatch,navigate])
  
  return (
    <div>
        <h1 className = 'title'>Companies</h1>
        {companies.map((company, index) => {
          return (
            <div className = 'Container' key = {index}>
              <section onMouseEnter = {() => setDropdown(index)} onMouseLeave = {() => setDropdown(null)}>
                <div className = 'kebabMenuIcon'/>
                <div className = 'containerDropdown'>
                  {dropdown === index ? 
                    <div className = 'containerDropdownContent'>
                        <button className = 'dropdownBtn'>Edit</button>
                        <button className = 'dropdownBtn'>View all jobs</button>
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
                <a href = {`/companies/${company.id}`}><button>View</button></a>
                <a href = {`/post-job/${company.id}`}><button>Post job</button></a> 
              </section>
            </div>
          )
        })}
    </div>
  )
}
