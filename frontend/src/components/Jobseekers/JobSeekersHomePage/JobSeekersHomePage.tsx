import React,{useState,useEffect} from 'react';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
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
      <label><h2>Potential jobs...</h2></label>
      <section style = {{display: 'flex', marginRight: '15px'}}>
        {jobs.values?.map((job,index) => {
          return(
            <div className = 'featuredContainer' key = {index}>
               <section onMouseEnter = {() => setDropdown(index)} onMouseLeave = {() => setDropdown(null)}>
                <div className = 'kebabMenuIcon'/>
                <div className = 'containerDropdown'>
                  {dropdown === index ? 
                    <div className = 'containerDropdownContent'>
                        <a href = {`jobs/${job.id}`}><button className = 'dropdownBtn'>View</button></a> 
                        <button className = 'dropdownBtn'>Hide</button>
                        <button className = 'deleteNavBtn'>Report</button>
                    </div>
                : null}
                </div>
              </section>

              <a href = {`/jobs/${job.id}`}><h2>{job.title}</h2></a>
              <a href = {`/companies/${job.company.id}`}><p>{job.company.name}</p></a>
              <p>{job.salary} a year</p>
              <hr className = 'mt-0-mb-4'/>
              <p className = 'containerText'>{job.description}</p>

                 
              <label><h3>Skills required:</h3></label>
                <div className = 'listContainer'>
                    {job.skills.map((skill,index) => {
                        return (<li key = {index}>{skill.name}</li>)
                    })}
                </div>
      
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
