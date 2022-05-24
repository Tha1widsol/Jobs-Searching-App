import React,{useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {fetchApplications} from '../../Global/features/Jobseekers/applications/applications'
import KebabMenu from '../../Global/KebabMenu/KebabMenu';
import {setDeleteSavedJob,fetchSavedJobs} from '../../Global/features/Jobseekers/savedJobs/savedJobs'
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert'
import './css/JobSeekerApplicationsPage.css'
import axios from 'axios'

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

export default function JobSeekerApplicationsPage() {
  let query = useQuery()
  const [dropdown,setDropdown] = useState<number | null>(null)
  const tab = query.get('tab')
  const dispatch = useAppDispatch();
  const applications = useAppSelector(state => state.applications)
  const savedJobs = useAppSelector(state => state.savedJobs)

  useEffect(() => {
      dispatch(fetchApplications('jobseeker'))
      dispatch(fetchSavedJobs())
  },[dispatch])

function handleRemoveSavedJob(id: number){
    axios.delete(`/api/save-job?id=${id}`)
    .then(response => {
        if (response.status === 200){
            dispatch(setDeleteSavedJob(id))
            handleAddSuccessMsg('Job is removed from saved', dispatch)
        } 
    })
}

  return (
    <div>
        <div className = 'applicationsNav'>
            <Link to = '/my-jobs?tab=applications' className = {tab !== 'saved' ? 'active' : ''}>Applied</Link>
            <Link to = '/my-jobs?tab=saved' className = {tab === 'saved' ? 'active' : ''}>Saved</Link>
        </div>
        
        <div style = {{marginTop: '50px'}}>
            {tab === 'saved' ? 
            <div>
                {!savedJobs.values.length ? 
                <div>
                   <h2>No jobs saved...</h2>
                   <Link to = '/home'><button>Find jobs</button></Link>
                </div>
                : null}
                 {savedJobs.values?.map((savedJobs, index) => {
                    return (
                        <div className = 'Container' key = {index}>
                            <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                                <Link to = {`/job/${savedJobs.job.id}`}><button className = 'dropdownBtn'>View</button></Link> 
                                <button className = 'dropdownBtn redNavBtn'>Report</button>
                                <button className = 'dropdownBtn redNavBtn' onClick = {() => handleRemoveSavedJob(savedJobs.id)}>Remove</button>
                           </KebabMenu>

                            <Link to = {`/job/${savedJobs.job.id}`}><h2>{savedJobs.job.title}</h2></Link>
                            <Link to = {`/company/${savedJobs.job.company?.id}`}><p>{savedJobs.job.company.name}</p></Link>
                            <hr className = 'mt-0-mb-4'/>
                            <section style = {{fontSize: 'small', color: 'gray'}}>
                            <p>Saved on: {savedJobs.savedDate.substring(0,10)}</p>
                           </section>
                           {savedJobs.job.applyOnOwnWebsite ? 
                            <a href = {savedJobs.job.link} target = 'blank'><button>Apply Externally</button></a>
                            : <Link to = {`/apply/${savedJobs.job.id}`}><button>Apply</button></Link>}
                        </div>
                    )
                  })}
             </div>
            : 
            !applications.values.length ? 
            <div>
                <h2>No applications made...</h2>
                <Link to = '/home'><button>Find jobs</button></Link>
             </div> : 
            applications.values?.map((application, index) => {
                return (
                    <div className = 'Container' key = {index}>
                        <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                            <Link to = {`/job/${application.job.id}`}><button className = 'dropdownBtn'>View</button></Link> 
                            <button className = 'dropdownBtn'>Hide</button>
                            <button className = 'dropdownBtn redNavBtn'>Delete</button>
                       </KebabMenu>

                       <Link to = {`/job/${application.job.id}`}><h2>{application.job.title}</h2></Link>
                       <Link to = {`/company/${application.job.company?.id}`}><p>{application.job.company.name}</p></Link>

                        <hr className = 'mt-0-mb-4'/>
                        <section style = {{display: 'flex', alignItems: 'center',}}>
                            <p style = {{marginRight: '5px'}}>Status:</p>
                            <div className = {application.status === 'applied' ? 'indicator amber' : applications.status === 'accepted' ? 'indicator green' : application.status === 'rejected' ? 'indicator red' : ''}></div>
                        </section>
    
                        <section style = {{fontSize: 'small', color: 'gray'}}>
                            <p>Start date: {application.job.startDate}</p>
                            <p>Applied date: {application.applicationDate.substring(0,10)}</p>
                        </section>
                        <button>Track</button>
                        {application.coverLetter ? <button>View cover letter</button> : null}
                    </div>
                )
            })}

        </div>

    
    </div>
    
  )
}
