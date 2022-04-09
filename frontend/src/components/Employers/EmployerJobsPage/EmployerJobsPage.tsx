import React,{useState,useEffect} from 'react'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {fetchJobs} from '../../Global/features/Employers/jobs/jobs'

export default function EmployerJobsPage() {
  const dispatch = useAppDispatch()
  const jobs = useAppSelector(state => state.jobs)
  const [dropdown,setDropdown] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchJobs('employer'))
  },[dispatch])

  return (
    <div>
      <h1 className = 'title'>Jobs</h1>

       {jobs.values?.map((job,index) => {
           return (
             <div className = 'Container' key = {index}>
               <section onMouseEnter = {() => setDropdown(index)} onMouseLeave = {() => setDropdown(null)}>
                <div className = 'kebabMenuIcon'/>
                <div className = 'containerDropdown'>
                  {dropdown === index ? 
                    <div className = 'containerDropdownContent'>
                        <a href = {`/edit-job/${job.id}`}><button className = 'dropdownBtn'>Edit</button></a>
                        <button className = 'deleteNavBtn'>Delete</button>
                    </div>
                : null}
                </div>
              </section>

                <section style = {{display: 'flex'}}>
                    <h2>{job.title}</h2>
                    {job.company?.logo ? <img className = 'logo' src = {job.company.logo} alt = ''/> : null} 
                </section>
                <p>{job.company?.name}</p>
                <p>{job.industry}</p>
                <p>Applicants: {job.applicantsCount}</p>
                <hr className = 'mt-0-mb-4'/>
                <a href = {`/job/${job.id}`}><button>View</button></a>
                {job.applicantsCount > 0 ? <a href = {`/applicants/${job.id}`}><button>View applicants</button></a> : null}
             </div>
           )
       })}
    </div>
  )
}
