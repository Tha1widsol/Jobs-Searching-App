import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import KebabMenu from '../../Global/KebabMenu/KebabMenu';
import {fetchJobs} from '../../Global/features/Employers/jobs/jobs'
import {fetchSavedJobs} from '../../Global/features/Jobseekers/savedJobs/savedJobs';
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert';
import {token} from '../../Global/features/Auth/user';
import axios from 'axios'

export default function JobSeekersHomePage() {
  const dispatch = useAppDispatch()
  const jobs = useAppSelector(state => state.jobs)
  const savedJobs = useAppSelector(state => state.savedJobs)
  const [dropdown,setDropdown] = useState<number | null>(null)
  const [matches,setMatches] = useState<Array<number>>([])

  useEffect(() => {
    axios.get('/api/getMatchingScores',{
      headers: {
          Authorization:`Token ${token}`
      }
  })
    .then(response => {
      const data = response.data
     setMatches(data.arr)
     
    })
    dispatch(fetchJobs('jobseeker'))
    dispatch(fetchSavedJobs())
 
  },[dispatch])
  function handleSaveJob(id: number){
    axios.post(`/api/save-job?id=${id}`,null,{
      headers: {
        Authorization: `Token ${token}`
      }
      
    })
    .then(() => {
      dispatch(fetchSavedJobs())
      handleAddSuccessMsg('Job is successfully saved', dispatch)
    })
  }
  
  return (
    <div>
      <label><h2>Potential job matches based on your profile...</h2></label>
      <section style = {{display: 'flex', marginRight: '15px'}}>
        
        {jobs.values?.map((job,index) => {
          return(
            <div className = 'featuredContainer' key = {index}>
              <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                <Link to = {`/job/${job.id}`}><button className = 'dropdownBtn'>View</button></Link> 
                <button className = 'dropdownBtn'>Hide</button>
                <button className = 'dropdownBtn redNavBtn'>Report</button>
              </KebabMenu>

                <Link to = {`/job/${job.id}`}><h2>{job.title}</h2></Link>
                <p style = {{color: 'gray'}}> {matches[job.id]}% - matching score</p>
            
              <Link to = {`/company/${job.company?.id}`}><p>{job.company?.name}</p></Link>
              {job.salary2 ? <p>{job.currency}{job.salary1} - {job.currency}{job.salary2} a year </p> : <p>{job.currency}{job.salary1} a year</p>} 
              <p>{job.type}</p>
              <hr className = 'mt-0-mb-4'/>
              <p className = 'containerText'>{job.description}</p>
          
              <label><h3>Roles:</h3></label>
                <section className = 'listContainer' style = {{marginBottom: '20px'}}>
                    {job.roles.map((role,index) => {
                        return (<li key = {index}>{role.name}</li>)
                    })}
                </section>
             
              <section style = {{textAlign:'center'}}>
                  {job.applyOnOwnWebsite ? 
                   <a href = {job.link} target = 'blank'><button>Apply Externally</button></a>
                  : <Link to = {`/apply/${job.id}`}><button>Apply</button></Link>}
                  {!savedJobs.values?.find(savedJob => savedJob.job.id === job.id) ? <button onClick = {() => handleSaveJob(job.id)}>Save</button> : null}
              </section>   

            </div>
          )
        })}
      </section>

      
    </div>
  )
}
