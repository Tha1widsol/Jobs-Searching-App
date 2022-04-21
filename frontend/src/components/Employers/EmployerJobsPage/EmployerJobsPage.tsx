import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import KebabMenu from '../../Global/KebabMenu/KebabMenu'
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
              <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                <Link to = {`/edit-job/${job.id}`}><button className = 'dropdownBtn'>Edit</button></Link>
                <button className = 'deleteNavBtn'>Delete</button>
              </KebabMenu>

                <section style = {{display: 'flex'}}>
                    <h2>{job.title}</h2>
                    {job.company?.logo ? <img className = 'logo' src = {job.company.logo} alt = ''/> : null} 
                </section>
                <p>{job.company?.name}</p>
                <p>{job.industry}</p>
                <p>Applicants: {job.applicantsCount}</p>
                <hr className = 'mt-0-mb-4'/>
                <Link to = {`/job/${job.id}`}><button>View</button></Link>
                {job.applicantsCount > 0 ? <a href = {`/applicants/${job.id}`}><button>View applicants</button></a> : null}
             </div>
           )
       })}
    </div>
  )
}
