import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import KebabMenu from '../../Global/KebabMenu/KebabMenu';
import {fetchJobs} from '../../Global/features/Employers/jobs/jobs'

export default function JobSeekersHomePage() {
  const dispatch = useAppDispatch()
  const jobs = useAppSelector(state => state.jobs)
  const [dropdown,setDropdown] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchJobs('jobseeker'))
  },[dispatch])
  
  return (
    <div>
      <label><h2>Potential jobs based on your profile...</h2></label>
      <section style = {{display: 'flex', marginRight: '15px'}}>
        {jobs.values?.map((job,index) => {
          return(
            <div className = 'featuredContainer' key = {index}>
              <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                <Link to = {`/job/${job.id}`}><button className = 'dropdownBtn'>View</button></Link> 
                <button className = 'dropdownBtn'>Hide</button>
                <button className = 'deleteNavBtn'>Report</button>
              </KebabMenu>
                   
              <Link to = {`/job/${job.id}`}><h2>{job.title}</h2></Link>
              <Link to = {`/company/${job.company?.id}`}><p>{job.company?.name}</p></Link>
              {job.salary2 ? <p>{job.currency}{job.salary1} - {job.currency}{job.salary2} a year </p> : <p>{job.currency}{job.salary1} a year</p>} 
              <p>{job.type}</p>
              <hr className = 'mt-0-mb-4'/>
              <p className = 'containerText'>{job.description}</p>

                
              <label><h3>Roles:</h3></label>
                <section className = 'listContainer'>
                    {job.roles.map((role,index) => {
                        return (<li key = {index}>{role.name}</li>)
                    })}
                </section>
             
              <section style = {{textAlign:'center'}}>
                   <button>Apply</button>
                   <button>Save</button>
              </section>   

            </div>
          )
        })}
      </section>

      
    </div>
  )
}
