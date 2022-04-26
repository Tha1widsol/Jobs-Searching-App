import React,{useState,useEffect} from 'react'
import {fetchJob} from '../../Global/features/Employers/jobs/job'
import {fetchProfile} from '../../Global/features/Jobseekers/profiles/profile'
import Profile from '../Profile/Profile'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import {useParams} from 'react-router-dom'

export default function ApplicationPage() {
    const dispatch = useAppDispatch()
    const {jobID} = useParams()
    const userID = useAppSelector(state => state.user.values.id)
    const job = useAppSelector(state => state.job.values)
    const profile = useAppSelector(state => state.profile)
    const [coverLetter,setCoverLetter] = useState({value: '', isValid: true, currentLength: 0, maxLength: 250, errorMsg: 'Cover letter needs to have atleast 150 characters'})
    const [currentTab,setCurrentTab] = useState(1)

    const maxTabs = document.querySelectorAll('.tab').length

    useEffect(() => {
        dispatch(fetchJob(Number(jobID)))
        dispatch(fetchProfile(userID))
    },[dispatch, jobID, userID])

    function handleSubmitForm(e: React.SyntheticEvent){
        return
    }

  return (
    <div>
        <h1 className = 'title'>Application for {job.title}:</h1>
         <div className = 'steps'>
            <span className = {`step ${currentTab === 1 ? 'active' : currentTab > 1 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(1) : null}><p className = 'step-label'>CV</p></span>
            <span className = {`step ${currentTab === 2 ? 'active' : currentTab > 2 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(2) : null}><p className = 'step-label'>Cover Letter</p></span>
        </div>

        <form>
            <div className = {`tab ${currentTab === 1 ? 'show' : 'hide'}`}>
                <Profile profile = {profile}/>
            </div>
    
            <div className = {`tab ${currentTab === 2 ? 'show' : 'hide'}`}>
                <label htmlFor = 'coverLetter' ><h3>Cover Letter (Optional) (Characters remaining: {coverLetter.maxLength - coverLetter.currentLength}):</h3></label>
                <textarea style = {{height: '150px'}} onChange = {e => setCoverLetter(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} placeholder = 'Cover letter...' maxLength = {coverLetter.maxLength} ></textarea>
            </div>

            {currentTab === maxTabs ? <button type = 'button' id = 'submit' onClick = {handleSubmitForm} >Submit</button> : <button type = 'button' className = 'toggleTabBtn' style = {{float:'right'}} onClick = {() => setCurrentTab(currentTab + 1)}>Next</button>}
            <button type = 'button' className = {currentTab > 1 ? 'toggleTabBtn' : 'hide'} onClick = {() => setCurrentTab(currentTab - 1)}>Previous</button>
        </form>
   
    </div>
  )
}
