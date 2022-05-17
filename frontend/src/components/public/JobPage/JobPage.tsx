import React,{useState,useEffect} from 'react'
import {useParams, useNavigate, Link} from 'react-router-dom'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {fetchJob,setDeleteJob} from '../../Global/features/Employers/jobs/job'
import {fetchSavedJobs} from '../../Global/features/Jobseekers/savedJobs/savedJobs'
import {checkApplicationExists,setApplicationExists} from '../../Global/features/Jobseekers/applications/checkApplicationExists'
import {token} from '../../Global/features/Auth/user'
import KebabMenu from '../../Global/KebabMenu/KebabMenu'
import Popup from '../../Global/Popup/Popup'
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert'
import axios from 'axios'

export default function JobPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.values)
    const applicationExists = useAppSelector(state => state.checkApplicationExists.values.doesExist)
    const {jobID} = useParams()
    const job = useAppSelector(state => state.job)
    const [popup,setPopup] = useState(false)
    const [dropdown,setDropdown] = useState(false)
    const savedJobs = useAppSelector(state => state.savedJobs)

    useEffect(() => {
      dispatch(fetchJob(Number(jobID)))
      .unwrap()

      .catch(() => {
        navigate('/')
      })
      dispatch(fetchSavedJobs())

      if (!user.isAnEmployer){
        dispatch(checkApplicationExists(Number(jobID)))
        .unwrap()
        .then(response => {
          if (response.doesExist) dispatch(setApplicationExists({doesExist: true})) 
  
          else dispatch(setApplicationExists({doesExist: false}))
        })

      }
      

    },[dispatch, jobID, navigate])

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
    .then(() => {
      handleAddSuccessMsg('Job is successfully saved', dispatch)
    })
  }

  return (
    <div>
      <section className = 'Container'>
      <Popup trigger = {popup} switchOff = {() => setPopup(false)}>
         <p>Are you sure you want to remove this job?</p>
         <p style = {{fontSize: 'small'}}>(This action cannot be undone)</p>
         <button onClick = {handleDeleteJob}>Confirm</button>
      </Popup>

      <KebabMenu current = {dropdown} switchOn = {() => setDropdown(true)} switchOff = {() => setDropdown(false)}>
        {user?.isAnEmployer ? 
        <div>
           <button className = 'dropdownBtn' onClick = {() => navigate(`/edit-job/${jobID}`)} >Edit</button>
           <button className = 'deleteNavBtn' onClick = {() => setPopup(true)}>Delete</button>
        </div> 
        : 
        <div>
            <button className = 'deleteNavBtn'>Report</button>
        </div>
        }
        
      </KebabMenu>
                      
      <div style = {{display: 'flex'}}>
      <h2>{job.values?.title}</h2>
        {job.values?.company?.logo ? <img src = {`/media/${job.values?.company?.logo}`} className = 'logo' alt = ''/> : null}
      </div>
      <a href = {`/company/${job.values?.company?.id}`}><p>{job.values?.company?.name}</p></a>

      <p>{job.values?.description}</p> 
      <hr className = 'mt-0-mb-4'/>
      {!applicationExists ? 
        !user?.isAnEmployer ?
        <div>
          {job.values?.applyOnOwnWebsite ? 
                  <a href = {job.values?.link} target = 'blank'><button>Apply Externally</button></a>
                  : <Link to = {`/apply/${job.values?.id}`}><button>Apply</button></Link>}

           {!savedJobs.values?.find(savedJob => savedJob.job.id === Number(jobID)) ? <button onClick = {() => handleSaveJob(Number(jobID))}>Save</button> : null}
          </div>
          : null
          
          : !user.isAnEmployer ? <p><b>Already applied</b></p> : null}
       </section>

       <section className = 'Container'>
          <label><h3>Salary:</h3></label>
          <hr className = 'mt-0-mb-4'/>
          {job.values?.salary2 ? <p>{job.values?.currency}{job.values?.salary1} - {job.values?.currency}{job.values?.salary2} a year </p> : <p>{job.values?.currency}{job.values?.salary1} a year</p>} 
        </section>

        <section className = 'Container'>
          <label><h3>Roles:</h3></label>
          <div className = 'listContainer'>
            {job.values?.roles?.map((role,index) => {
                return (<li key = {index}>{role.name}</li>)
            })}
          </div>

          {job.values?.skills?.filter(skill => skill.name).length ? 
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
          
            {job.values?.benefits?.filter(benefit => benefit.name).length ? 
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
