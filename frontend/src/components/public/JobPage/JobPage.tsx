import React,{useEffect} from 'react'
import {useParams} from 'react-router-dom'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {fetchJob} from '../../Global/features/Employers/jobs/job'

export default function JobPage() {
    const dispatch = useAppDispatch()
    const {jobID} = useParams()
    const job = useAppSelector(state => state.job)

    useEffect(() => {
      dispatch(fetchJob(Number(jobID)))
    },[dispatch,jobID])

  return (
    <div>
      <section className = 'Container'>
          <div style = {{display: 'flex'}}>
          <h2>{job.values?.title}</h2>
            {job.values?.company?.logo ? <img src = {`/media/${job.values?.company?.logo}`} className = 'logo' alt = ''/> : null}
          </div>
          <a href = {`/companies/${job.values?.company?.id}`}><p>{job.values?.company?.name}</p></a>
          <hr className = 'mt-0-mb-4'/>
          <p>{job.values?.description}</p> 
       </section>

       <section className = 'Container'>
          <label><h3>Salary:</h3></label>
          <hr className = 'mt-0-mb-4'/>
          {job.values?.salary} a year
        </section>

        <section className = 'Container'>
          <label><h3>Roles:</h3></label>
          <div className = 'listContainer'>
            {job.values?.roles.map((role,index) => {
                return (<li key = {index}>{role.name}</li>)
            })}
          </div>
         

          {job.values?.skills[0].name ? 
          <div>
            <hr className = 'mt-0-mb-4'/>
            <label><h3>Skills:</h3></label>
            <div className = 'listContainer'>
              {job.values?.skills.map((skill,index) => {
                  return (<li key = {index}>{skill.name}</li>)
              })}
            </div>
          </div> 
          : null}
          
            {job.values?.benefits[0].name ? 
            <div>
              <hr className = 'mt-0-mb-4'/>
              <label><h3>Benefits:</h3></label>
              <div className = 'listContainer'>
                {job.values?.benefits.map((benefit,index) => {
                  return (<li key = {index}>{benefit.name}</li>)
                })}
              </div>
            </div>
              : null}
        </section>
       
        <section className = 'Container'>
        <label><h3>Type:</h3></label> 
           <p>{job.values?.type}</p>
           <hr className = 'mt-0-mb-4'/>
          <label><h3>Working Days/Hours:</h3></label>
          <p>{job.values?.workingDays}</p>
          <p>{job.values?.workingHours} hours a day</p>
        </section>

        <section className = 'Container'>
           <label><h3>Remote:</h3></label> 
           <p>{job.values?.remote ? 'Yes' : 'No'}</p>
           <hr className = 'mt-0-mb-4'/>

           <label><h3>Training:</h3></label> 
           <p>{job.values?.training ? 'Yes' : 'No'}</p>
        </section>
        

        <section className = 'Container'>
          <label><h3>Education required:</h3></label>
          <hr className = 'mt-0-mb-4'/>
          <p>{job.values?.education}</p>
        </section>

        <section className = 'Container'>
           <label><h3>Start date:</h3></label>
           <p>{job.values?.startDate}</p>
           <hr className = 'mt-0-mb-4'/>
           <label><h3>Positions:</h3></label>
           <p>{job.values?.positions}</p>
           <hr className = 'mt-0-mb-4'/>
           <label><h3>Industry:</h3></label>
           <p>{job.values?.industry}</p>
        </section>

    </div>
  )
}
