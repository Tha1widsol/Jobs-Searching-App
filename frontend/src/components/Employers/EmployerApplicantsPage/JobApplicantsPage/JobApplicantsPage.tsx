import React,{useState,useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import KebabMenu from '../../../Global/KebabMenu/KebabMenu'
import {useAppSelector,useAppDispatch} from '../../../Global/features/hooks'
import {fetchApplications} from '../../../Global/features/Jobseekers/applications/applications'

export default function JobApplicantsPage() {
    const dispatch = useAppDispatch()
    const applicants = useAppSelector(state => state.applications)
    const [dropdown,setDropdown] = useState<number | null>(null)
    const {jobID} = useParams()
    const jobTitle = applicants.values[0]?.job.title

    useEffect(() => {
        dispatch(fetchApplications(`employers/job?jobID=${jobID}`))
    },[dispatch, jobID])

  return (
    <div>
        <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h1>Applications for <Link to = {`/job/${jobID}`}>{jobTitle}:</Link></h1>
          <button>Screen applicants</button>
        </div>

        <hr className = 'mt-0-mb-4' style = {{marginBottom: '20px'}}/>
        {applicants.values?.map((applicant, index) => {
          return (
            <div className = 'Container' key = {index}>
            <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                <Link to = {`/profile/${applicant.profile.id}`}><button className = 'dropdownBtn'>View</button></Link>
                <button className = 'dropdownBtn'>Track</button>
                <button className = 'deleteNavBtn'>Reject</button>
            </KebabMenu>
            
            <Link to = {`/profile/${applicant.profile.id}`}><h2>{applicant.profile.firstName} {applicant.profile.lastName}</h2></Link>
            <section style = {{display: 'flex', alignItems: 'center',}}>
                    <p style = {{marginRight: '5px'}}>Status:</p>
                    <div className = {applicant.status === 'applied' ? 'indicator amber' : applicant.status === 'accepted' ? 'indicator green' : applicant.status === 'rejected' ? 'indicator red' : ''}></div>
            </section>

            <section style = {{fontSize: 'small', color: 'gray'}}>
                    <p>Start date of job: {applicant.job.startDate}</p>
                    <p>Applied date: {applicant.applicationDate.substring(0,10)}</p>
            </section>

            <button>Move forward</button>
            <button>Hire</button>
        </div>
          )
        })}
    </div>
  )
}
