import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useQuery} from '../../Global/features/hooks';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import KebabMenu from '../../Global/KebabMenu/KebabMenu';
import {fetchMatchingJobs} from '../../Global/features/Jobseekers/matchingJobs/matchingJobs';
import {fetchSavedJobs} from '../../Global/features/Jobseekers/savedJobs/savedJobs';
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert';
import {token} from '../../Global/features/Auth/user';
import JobSearchBar from '../../public/SearchBar/JobSearchBar';
import axios from 'axios'

export default function JobSeekersHomePage() {
  const dispatch = useAppDispatch()
  const query = useQuery()
  const matchingJobs = useAppSelector(state => state.matchingJobs)
  const savedJobs = useAppSelector(state => state.savedJobs)
  const [dropdown,setDropdown] = useState<number | null>(null)
  const searchVal = query.get('q')

  useEffect(() => {
    dispatch(fetchMatchingJobs(searchVal || ''))
    dispatch(fetchSavedJobs())
  },[dispatch, searchVal])
  
  function handleSaveJob(id: number){
    axios.post(`/api/save-job?id=${id}`,null,{
      headers: {
        Authorization: `Token ${token}`
      }
      
    })
    .then(() => {
      dispatch(fetchSavedJobs())
      handleAddSuccessMsg('Job is successfully saved', dispatch)
    })
  }
  
  return (
    <div>
      <JobSearchBar/>

      {matchingJobs.values.length ? 
      <div>
       <label><h2>Potential job matches based on your profile...</h2></label>
       <section style = {{display: 'flex', marginRight: '15px'}}>
         {matchingJobs.values?.map((matching, index) => {
           return(
             <div className = 'featuredContainer' key = {index}>
               <KebabMenu current = {dropdown} many = {true} index = {index} switchOn = {() => setDropdown(index)} switchOff = {() => setDropdown(null)}>
                 <Link to = {`/job/${matching.job?.id}`}><button className = 'dropdownBtn'>View</button></Link> 
                 <button className = 'dropdownBtn'>Hide</button>
                 <button className = 'dropdownBtn redNavBtn'>Report</button>
               </KebabMenu>
 
               <Link to = {`/job/${matching.job?.id}`}><h2>{matching.job?.title}</h2></Link>
               <p style = {{color: 'gray'}}> {matching.score || '??'}% - matching score</p>
             
               <Link to = {`/company/${matching.company?.id}`}><p>{matching.company?.name}</p></Link>
               {matching.job?.salary2 ? <p>{matching.job?.currency}{matching.job?.salary1} - {matching.job?.currency}{matching.job?.salary2} a year </p> : <p>{matching.job?.currency}{matching.job?.salary1} a year</p>} 
               <p>{matching.job?.type}</p>
               <hr className = 'mt-0-mb-4'/>
               
               <label><h3>Description:</h3></label>
               <p className = 'containerText'>{matching.job?.description}</p>
           
               <label><h3>Roles:</h3></label>
                 <section className = 'listContainer'>
                     {matching.job?.roles.map((role,index) => {
                         return (<li key = {index}>{role.name}</li>)
                     })}
                 </section>
              
               <section style = {{textAlign:'center', marginTop: '20px'}}>
                   {matching.job?.applyOnOwnWebsite ? 
                    <a href = {matching.job?.link} target = 'blank'><button>Apply Externally</button></a>
                   : <Link to = {`/apply/${matching.job?.id}`}><button>Apply</button></Link>}
                   {!savedJobs.values?.find(savedJob => savedJob.job.id === matching.job?.id) ? <button onClick = {() => handleSaveJob(matching.job?.id)}>Save</button> : null}
               </section>   
 
             </div>
           )
         })}
       </section>
      </div>
     : <h2>No jobs found...</h2>}
      
    </div>
  )
}
