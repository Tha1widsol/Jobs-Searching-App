import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {fetchApplications} from '../../Global/features/Jobseekers/applications/applications'
import KebabMenu from '../../Global/KebabMenu/KebabMenu'

export default function EmployerApplicantsPage() {
    const dispatch = useAppDispatch()
    const [dropdown,setDropdown] = useState<number | null>(null)
    const applicants = useAppSelector(state => state.applications)

    useEffect(() => {
        dispatch(fetchApplications('employers'))
    },[dispatch])

  return (
    <div>
        {!applicants.values?.length ? 
        <div>
            <h2>No applicants yet...</h2>
            <Link to = '/home'><button>Find profiles</button></Link>
        </div>
         : null}

         <p><b>Screen applicants now (Go to my jobs):</b></p>
         <Link to = '/jobs'><button>My Jobs</button></Link>
         <hr className = 'mt-0-mb-4' style = {{marginBottom: '20px', marginTop: '20px'}}/>
         <h1>Recent applicants:</h1>

        {applicants.values?.map((applicant, index) => {
            return (
                <div className = 'Container' key = {index}>
                    <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                        <Link to = {`/profile/${applicant.profile.id}`}><button className = 'dropdownBtn'>View</button></Link>
                        <button className = 'dropdownBtn'>Track</button>
                        <button className = 'deleteNavBtn'>Reject</button>
                    </KebabMenu>
                    
                    <Link to = {`/profile/${applicant.profile.id}`}><h2>{applicant.profile.firstName} {applicant.profile.lastName}</h2></Link>
                    <Link to = {`/job/${applicant.job.id}`}><p>Applied for: {applicant.job.title}</p></Link>
                    <hr className = 'mt-0-mb-4'/>
                    <section style = {{display: 'flex', alignItems: 'center',}}>
                            <p style = {{marginRight: '5px'}}>Status:</p>
                            <div className = {applicant.status === 'applied' ? 'indicator amber' : applicant.status === 'accepted' ? 'indicator green' : applicant.status === 'rejected' ? 'indicator red' : ''}></div>
                    </section>

                    <section style = {{fontSize: 'small', color: 'gray'}}>
                            <p>Start date of job: {applicant.job.startDate}</p>
                            <p>Applied date: {applicant.applicationDate.substring(0,10)}</p>
                    </section>

                    <button>Shortlist</button>
                    <button>Hire</button>
                </div>
            )
        })}
    </div>
  )
}
