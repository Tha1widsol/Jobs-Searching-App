import React,{useState,useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {fetchApplications} from '../../Global/features/Jobseekers/applications/applications'
import './css/JobSeekerApplicationsPage.css'
import KebabMenu from '../../Global/KebabMenu/KebabMenu';

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

export default function JobSeekerApplicationsPage() {
  let query = useQuery()
  const [dropdown,setDropdown] = useState<number | null>(null)
  const tab = query.get('tab')
  const dispatch = useAppDispatch();
  const applications = useAppSelector(state => state.applications)

  useEffect(() => {
    dispatch(fetchApplications('jobseeker'))
  },[dispatch])

  return (
    <div>
        <div className = 'applicationsNav'>
            <Link to = '/my-jobs?tab=applications' className = {tab !== 'saved' ? 'active' : ''}>Applied</Link>
            <Link to = '/my-jobs?tab=saved' className = {tab === 'saved' ? 'active' : ''}>Saved</Link>
        </div>
        
        <div style = {{marginTop: '50px'}}>
            {tab === 'saved' ? 
            <div>
                <p>Saved</p>
             </div>
            : 
            applications.values?.map((application, index) => {
                return (
                    <div className = 'Container' key = {index}>
                        <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                            <Link to = {`/job/${application.job.id}`}><button className = 'dropdownBtn'>View</button></Link> 
                            <button className = 'dropdownBtn'>Hide</button>
                            <button className = 'deleteNavBtn'>Delete</button>
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
