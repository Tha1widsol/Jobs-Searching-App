import React,{useState,useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {fetchJob,setDeleteJob} from '../../Global/features/Employers/jobs/job'
import {fetchJobExperience} from '../../Global/features/Employers/jobs/jobExperience'
import {fetchApplications} from '../../Global/features/Jobseekers/applications/applications'
import {fetchSavedJobs} from '../../Global/features/Jobseekers/savedJobs/savedJobs'
import {token} from '../../Global/features/Auth/user'
import KebabMenu from '../../Global/KebabMenu/KebabMenu'
import Popup from '../../Global/Popup/Popup'
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert'
import axios from 'axios'

export default function JobPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const {jobID} = useParams()
    const job = useAppSelector(state => state.job)
    const [popup,setPopup] = useState(false)
    const [dropdown,setDropdown] = useState(false)
    const savedJobs = useAppSelector(state => state.savedJobs)
    const applications = useAppSelector(state => state.applications)
    const experience = useAppSelector(state => state.jobExperience)
    const [matchingScore, setMatchingScore] = useState(0)

    useEffect(() => {
      window.scrollTo(0, 0)
      dispatch(fetchJob(Number(jobID)))
      if (!user.isLoggedIn) return
      dispatch(fetchApplications('jobseekers'))
      dispatch(fetchJobExperience(Number(jobID)))
      .unwrap()
      .catch(() => {
        navigate('/')
      })
      dispatch(fetchSavedJobs())
      
      axios.get(`/api/getMatchScore?id=${jobID}`,{headers: {Authorization: `Token ${token}`}})
      .then(response => {
        const score = response.data.score
        if (response.status === 200) setMatchingScore(score)
      })

    },[dispatch, jobID, navigate, user.isLoggedIn])

    function handleDeleteJob(){
      axios.delete(`/api/job?id=${jobID}`,{headers: {Authorization: `Token ${token}`}})
      .then(response => {
      if (response.status === 200){
          dispatch(setDeleteJob())
          navigate('/')
          handleAddSuccessMsg('Profile is successfully removed', dispatch)
      } 

    })
  }

  function handleSaveJob(id: number){
    axios.post(`/api/save-job?id=${id}`,null,{
      headers: {
        Authorization: `Token ${token}`
      }
      
    })
    .then(response => {
      if (response.status === 200){
        dispatch(fetchSavedJobs())
        handleAddSuccessMsg('Job is successfully saved', dispatch)
      }
    })
  }

  return (
    <div>
      <section className = 'Container'>
      <Popup trigger = {popup} switchOff = {() => setPopup(false)}>
        <div style = {{textAlign: 'center'}}>
          <p>Are you sure you want to remove this job?</p>
          <p style = {{fontSize: 'small'}}>(This action cannot be undone)</p>
          <button onClick = {handleDeleteJob}>Confirm</button>
          <button type = 'button' onClick = {() => setPopup(false)}>Cancel</button>
        </div>
      </Popup>

      <KebabMenu current = {dropdown} switchOn = {() => setDropdown(true)} switchOff = {() => setDropdown(false)}>
        {user.values?.isAnEmployer ? 
        <div>
           <button className = 'dropdownBtn' onClick = {() => navigate(`/edit-job/${jobID}`)} >Edit</button>
           <button className = 'dropdownBtn redNavBtn' onClick = {() => setPopup(true)}>Delete</button>
        </div> 
        : 
        <div>
            <button className = 'dropdownBtn redNavBtn'>Report</button>
        </div>
        }
        
      </KebabMenu>
                      
      <div className = 'row'>
        <h2>{job.values?.title}</h2>
        {job.values?.company?.logo ? <img src = {`/media/${job.values?.company?.logo}`} className = 'logo' alt = ''/> : null}
      </div>
        <span style = {{color: 'gray', fontSize: 'small'}}> {matchingScore}% - matching score</span>
      <a href = {`/company/${job.values?.company?.id}`}><p>{job.values?.company?.name}</p></a>

      <p>{job.values?.description}</p> 
      <hr className = 'mt-0-mb-4'/>
      {user.values?.isAnEmployer ? 
         <div>
          {job.values?.applicantsCount > 0 ? 
              <div> 
                  <p>Applicants: {job.values?.applicantsCount}</p>
                  <Link to =  {`/applicants/${job.values?.id}`}><button>View applicants</button></Link>
              </div> : 
                <p>No applicants yet</p>
              }
          </div>
      : null}

      {!applications.values?.find(application => application.job.id === Number(jobID)) ? 
        !user.values?.isAnEmployer ?
        <div>
          {job.values?.applyOnOwnWebsite ? 
                  <a href = {job.values?.link} target = 'blank'><button>Apply Externally</button></a>
                  : <Link to = {`/apply/${job.values?.id}`}><button>Apply</button></Link>}

           {!savedJobs.values?.find(savedJob => savedJob.job.id === Number(jobID)) && user.isLoggedIn ? <button onClick = {() => handleSaveJob(Number(jobID))}>Save</button> : null}
          </div>
          : null
          
          : !user.values?.isAnEmployer ? <p><b>Already applied</b></p> : null}
       </section>

       <section className = 'Container'>
          <label><h3>Salary:</h3></label>
          {job.values?.salary2 ? <p>{job.values?.currency}{job.values?.salary1} - {job.values?.currency}{job.values?.salary2} a year </p> : <p>{job.values?.currency}{job.values?.salary1} a year</p>} 
        </section>

        <section className = 'Container'>
          <label><h3>Roles:</h3></label>
          <hr className = 'mt-0-mb-4'/>
          <div className = 'listContainer' style = {{marginBottom: '50px'}}>
            {job.values?.roles?.map((role,index) => {
                return (<li key = {index}>{role.name}</li>)
            })}
          </div>

          {job.values?.skills?.filter(skill => skill.name).length ? 
          <div>
            <label><h3>Skills:</h3></label>
            <hr className = 'mt-0-mb-4'/>
            <div className = 'listContainer' style = {{marginBottom: '50px'}}>
              {job.values?.skills.map((skill,index) => {
                  return (<li key = {index}>{skill.name}</li>)
              })}
            </div>
          </div> 
          : null}
          {experience.values?.length ? 
          <div>
              <label><h3>Work Experience</h3></label>
              <hr className = 'mt-0-mb-4'/>
              <div className = 'listContainer'>
                {experience.values?.map((exp, index) => {
                  return (
                      <div style = {{display: 'flex', alignItems: 'center', gap: '5px'}} key = {index}>
                          <li style = {{maxWidth: '400px', overflow: 'auto'}}>{exp.experience}</li>
                          {exp.years > 0 ? <b>- {exp.years} years</b> : null}
                          {exp.required ? <b> required</b> : <b style = {{color: 'gray'}}>- preferred</b>}
                      </div>
                  )
                })}
              </div>
            </div>
          : null}
        
            {job.values?.benefits?.filter(benefit => benefit.name).length ? 
            <div>
              <label><h3>Benefits:</h3></label>
              <hr className = 'mt-0-mb-4'/>
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
           <hr className = 'mt-0-mb-4'/>
            <p>{job.values?.type}</p>
          <label><h3>Working Days/Hours:</h3></label>
           <hr className = 'mt-0-mb-4'/>
          {job.values?.workingDay2 ? <p>{job.values?.workingDay1} - {job.values?.workingDay2}</p> : <p>{job.values?.workingDay1}</p>}
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
