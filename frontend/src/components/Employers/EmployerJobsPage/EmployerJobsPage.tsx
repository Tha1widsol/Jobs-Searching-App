import React,{useState,useEffect} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import KebabMenu from '../../Global/KebabMenu/KebabMenu'
import Popup from '../../Global/Popup/Popup'
import {fetchJobs,setJobs} from '../../Global/features/Employers/jobs/jobs'
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert'
import axios from 'axios'

export default function EmployerJobsPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const jobs = useAppSelector(state => state.jobs)
  const [chosenJob,setChosenJob] = useState({id: 0, title: ''})
  const [popup,setPopup] = useState(false)
  const [dropdown,setDropdown] = useState<number | null>(null)

  useEffect(() => {
    dispatch(fetchJobs('employer'))
  },[dispatch])

  function ShowPopup(id: number, title: string){
    setChosenJob({id: id, title: title})
    setPopup(true)
  }

  function handleDeleteJob(){
    axios.delete(`/api/job?id=${chosenJob.id}`)
    .then(response => {
    if (response.status === 200){
        const newJobs = [...jobs.values]
        let index = newJobs.findIndex(job => job.id === chosenJob.id)
        newJobs.splice(index, 1)
        dispatch(setJobs(newJobs))
        handleAddSuccessMsg('Job is successfully removed', dispatch)
        navigate('/jobs')
        setPopup(false)
    } 

  })
}

  return (
    <div>
      <Popup trigger = {popup} switchOff = {() => setPopup(false)}>
          <p>Are you sure you want to remove {chosenJob.title}?</p>
          <p style = {{fontSize: 'small'}}>(This action cannot be undone)</p>
          <button onClick = {handleDeleteJob}>Confirm</button>
      </Popup>

      <h1 className = 'title'>Jobs</h1>

       {jobs.values?.map((job,index) => {
           return (
             <div className = 'Container' key = {index}>
              <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                <Link to = {`/edit-job/${job.id}`}><button className = 'dropdownBtn'>Edit</button></Link>
                <button className = 'deleteNavBtn' onClick = {() => ShowPopup(job.id,job.title)}>Delete</button>
              </KebabMenu>

                <section style = {{display: 'flex'}}>
                    <h2>{job.title}</h2>
                    {job.company?.logo ? <img className = 'logo' src = {job.company.logo} alt = ''/> : null} 
                </section>
                <p>{job.company?.name}</p>
                <p>{job.industry}</p>
                <p>Applicants: {job.applicantsCount}</p>
                <hr className = 'mt-0-mb-4'/>
                <Link to = {`/job/${job.id}`}><button>View</button></Link>
                {job.applicantsCount > 0 ? <a href = {`/applicants/${job.id}`}><button>View applicants</button></a> : null}
             </div>
           )
       })}
    </div>
  )
}
