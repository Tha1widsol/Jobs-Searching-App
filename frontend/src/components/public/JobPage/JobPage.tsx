import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {fetchJobs} from '../../Global/features/Employers/jobs'

export default function JobPage() {
    const dispatch = useAppDispatch()
    const {jobID} = useParams()
    const jobs = useAppSelector(state => state.jobs)
    const job = jobs.values?.find(job => job.id === Number(jobID))

    useEffect(() => {
      dispatch(fetchJobs())
    },[dispatch])

  return (
    <div>
      <section className = 'Container'>
          <div style = {{display: 'flex'}}>
            <h2>{job?.title}</h2>
            {job?.company.logo ? <img src = {`/media/${job?.company.logo}`} className = 'logo' alt = ''/> : null}
          </div>
          <a href = {`/companies/${job?.company.id}`}><p>{job?.company.name}</p></a>
          <hr className = 'mt-0-mb-4'/>
          <p>{job?.description}</p> 
       </section>

       <section className = 'Container'>
          <label><h3>Salary:</h3></label>
          <hr className = 'mt-0-mb-4'/>
          {job?.salary} a year
        </section>

        <section className = 'Container'>
          <label><h3>Roles:</h3></label>
          <div className = 'listContainer'>
            {job?.roles.map((role,index) => {
                return (<li key = {index}>{role.name}</li>)
            })}
          </div>
         
            <hr className = 'mt-0-mb-4'/>
            <label><h3>Skills:</h3></label>
            <div className = 'listContainer'>
              {job?.skills.map((skill,index) => {
                  return (<li key = {index}>{skill.name}</li>)
              })}
            </div>
            <hr className = 'mt-0-mb-4'/>
            <label><h3>Benefits:</h3></label>
            <div className = 'listContainer'>
              {job?.benefits.map((benefit,index) => {
                return (<li key = {index}>{benefit.name}</li>)
              })}
            </div>
        </section>
       
        <section className = 'Container'>
        <label><h3>Type:</h3></label> 
           <p>{job?.type}</p>
           <hr className = 'mt-0-mb-4'/>
          <label><h3>Working Days/Hours:</h3></label>
          <p>{job?.workingDays}</p>
          <p>{job?.workingHours} hours a day</p>
        </section>

        <section className = 'Container'>
           <label><h3>Remote:</h3></label> 
           <p>{job?.remote ? 'Yes' : 'No'}</p>
           <hr className = 'mt-0-mb-4'/>

           <label><h3>Training:</h3></label> 
           <p>{job?.training ? 'Yes' : 'No'}</p>
        </section>
        

        <section className = 'Container'>
          <label><h3>Education required:</h3></label>
          <hr className = 'mt-0-mb-4'/>
          <p>{job?.education}</p>
        </section>

        <section className = 'Container'>
           <label><h3>Start date:</h3></label>
           <p>{job?.startDate}</p>
           <hr className = 'mt-0-mb-4'/>
           <label><h3>Positions:</h3></label>
           <p>{job?.positions}</p>
           <hr className = 'mt-0-mb-4'/>
           <label><h3>Industry:</h3></label>
           <p>{job?.industry}</p>
           <label><h3>Date posted:</h3></label>
           <p>{job?.datePosted}</p>
        </section>

    </div>
  )
}
