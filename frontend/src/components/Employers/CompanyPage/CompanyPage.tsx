import React,{useState,useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../../app/hooks';
import {fetchCompany} from '../../../features/Employers/companies/company';
import {fetchJobs} from '../../../features/Employers/jobs/jobs';
import './css/CompanyPage.css'

export default function CompanyPage() {
  const navigate = useNavigate()
  const company = useAppSelector(state => state.company)
  const jobs = useAppSelector(state => state.jobs.values)
  const [dropdown,setDropdown] = useState(false)
  const dispatch = useAppDispatch()
  const {companyID} = useParams()

  useEffect(() => {
    dispatch(fetchJobs('employer'))
    dispatch(fetchCompany(Number(companyID)))
    .then(response => {
      if (response.meta.requestStatus === 'rejected') navigate('/companies')
    })

    dispatch(fetchJobs('employer'))
  },[companyID, dispatch, navigate])

  return (
    <div>
        {company.values?.banner ? <img src = {`${company.values?.banner}`} className = 'banner' alt = ''/> : null}
        <section className = 'companySection'>
            <section onMouseEnter = {() => setDropdown(true)} onMouseLeave = {() => setDropdown(false)}>
              <div className = 'kebabMenuIcon'/>
              <div className = 'containerDropdown'>
                {dropdown ? 
                  <div className = 'containerDropdownContent'>
                      <Link to = {`/edit-company/${company.values?.id}`}><button className = 'dropdownBtn'>Edit</button></Link>
                      <button className = 'dropdownBtn redNavBtn'>Delete</button>
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

        <section className = 'companySection' style = {{overflowX: 'auto'}}>
          <div style = {{display: 'flex', gap: '20px'}}>
            <label><h3>Jobs:</h3></label>
            <Link to = {`/post-job/${companyID}`}><button type = 'button'>Post job</button></Link>
          </div>
          <hr className = 'mt-0-mb-4' style = {{marginTop: '10px', marginBottom: '20px'}}/>
          {jobs.length ? 
          <>
           <div style = {{display: 'flex', gap: '20px'}}>
           {jobs.map((job, index) => {
             return (
                 <div className = 'Container' key = {index}>
                     <Link to = {`/job/${job.id}`}><h3>{job.title}</h3></Link>
                     <p>Applicants - {job.applicantsCount}</p>
                     <p style = {{fontSize: 'small', color: 'gray'}}>Created on {job.datePosted.slice(0, 10)}</p>
                 </div>
             )
           })}

         </div>
          <Link to = '/jobs'><button>See all</button></Link>
          </>
          : 
            <p>No jobs posted</p>
        }
  
        </section>

  
    </div>
  )
}
