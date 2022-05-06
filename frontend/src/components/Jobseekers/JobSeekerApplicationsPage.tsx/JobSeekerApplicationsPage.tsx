import React,{useEffect} from 'react'
import {Link,useLocation} from 'react-router-dom'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {fetchApplications} from '../../Global/features/Jobseekers/applications/applications'
import './css/JobSeekerApplicationsPage.css'

function useQuery(){
    return new URLSearchParams(useLocation().search)
}

export default function JobSeekerApplicationsPage() {
  let query = useQuery()
  const tab = query.get('tab')
  const dispatch = useAppDispatch();
  const applications = useAppSelector(state => state.applications)

  useEffect(() => {
    dispatch(fetchApplications('jobseeker'))
  },[dispatch])

  return (
    <div>
        <div className = 'applicationsNav'>
            <Link to = '/my-jobs?tab=applications' className = {tab === 'applications' ? 'active' : ''}>Applied</Link>
            <Link to = '/my-jobs?tab=saved' className = {tab === 'saved' ? 'active' : ''}>Saved</Link>
        </div>
        
        <div style = {{marginTop: '50px'}}>
            {tab === 'applications' ? 
                applications.values?.map((application, index) => {
                    return (
                        <div className = 'Container' key = {index}>
                            <p>{application.job.title}</p>
                            <p>{application.job.company.name}</p>
                        </div>
                    )
                })
            : null}

            {tab === 'saved' ? 
                <p>Saved</p>
            : null}
        </div>

    
    </div>
    
  )
}
