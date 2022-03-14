import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Errors from '../../Global/messages/Errors'
import {ListProps} from '../../Global/types/forms';
import {handleFixName} from '../../Global/formFunctions';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import ReactScrollableFeed from 'react-scrollable-feed';
import {getcurrentDate} from '../../Global/formFunctions';
import List from '../../Global/Forms/List';
import axios from 'axios';

export default function JobFormPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const [currentTab,setCurrentTab] = useState(1)
  const [errors,setErrors] = useState<Array<string>>([])
  const [title,setTitle] = useState({value: '', isValid: true, errorMsg: 'Title is invalid'})
  const [description,setDescription] = useState({value: '', isValid: true, errorMsg: 'Experience section is invalid',currentLength: 0, maxLength: 300})
  const [salary1,setSalary1] = useState({value: '', errorMsg: 'Salary value is invalid'})
  const [salary2,setSalary2] = useState({value: '', errorMsg: 'Salary value is invalid'})
  const [currency,setCurrency] = useState({value: '$'})
  const [roles,setRoles] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid Role', alreadyExists: false, alreadyExistsMsg: 'Role already exists',AddedMsg:'Role added',RemovedMsg: 'Role removed'})
  const [industry,setIndustry] = useState({value: 'Any'})
  const [isRemote,setIsRemote] = useState(false)
  const [isTrainingProvided,setIsTrainingProvided] = useState(false)
  const [positions,setPositions] = useState({value: 1, errorMsg: 'Positions value is invalid'})
  const [education,setEducation] = useState({value: 'No formal education'})
  const [skills,setSkills] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid skill', alreadyExists: false, alreadyExistsMsg: 'Skill already exists',AddedMsg:'Skill added',RemovedMsg: 'Skill removed'})
  const [startDate,setStartDate] = useState({value: ''})
  const [benefits,setBenefits] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid benefit', alreadyExists: false, alreadyExistsMsg: 'Benefit already exists',AddedMsg:'benefit added',RemovedMsg: 'Benefit removed'})
  const [workingDay1,setWorkingDay1] = useState({value: 'Monday'})
  const [workingDay2,setWorkingDay2] = useState({value: 'Friday'})
  const [workingHours,setWorkingHours] = useState({value: 1,errorMsg: 'working hours value is invalid'})
  const [applyOnOwnWebsite,setApplyOnOwnWebsite] = useState(false)
  const [website,setWebsite] = useState({value: '',isValid: true, errorMsg: 'Website URL is invalid'})
  const [type,setType] = useState({value: 'Full-time'})

  const maxTabs = document.querySelectorAll('.tab').length

  function handleToPrevTab(){
    setErrors([])
    setCurrentTab(currentTab - 1)
}

function handleSetRoles(e: React.ChangeEvent<HTMLInputElement>){
  setRoles(prev => {return {...prev, currentVal: e.target.value}})
  e.target.value = e.target.value.replace(',','')
}

function handleSetSkills(e: React.ChangeEvent<HTMLInputElement>){
  setSkills(prev => {return {...prev, currentVal: e.target.value}})
  e.target.value = e.target.value.replace(',','')
}

function handleSetBenefits(e: React.ChangeEvent<HTMLInputElement>){
  setBenefits(prev => {return {...prev, currentVal: e.target.value}})
  e.target.value = e.target.value.replace(',','')
}

const validateForm = () => {
  return
}

  return (
    <div>
        <div className = 'steps'>
            <span className = {`step ${currentTab === 1 ? 'active' : currentTab > 1 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(1) : null}><p className = 'step-label'>About</p></span>
            <span className = {`step ${currentTab === 2 ? 'active' : currentTab > 2 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(2) : null}><p className = 'step-label'>Requirements</p></span>
        </div>

        <form>
            <div className = {`tab ${currentTab === 1 ? 'show' : 'hide'}`}>
              <h1 className = 'title'>About</h1> 
              <hr className = 'mt-0-mb-4'/>
              <Errors errors = {errors}/>
              <label htmlFor = 'jobTitle'><h3>Title:</h3></label>
              <input id = 'jobTitle' className = {!title.isValid ? 'inputError' : ''} onChange = {e => setTitle(prev => {return {...prev, value: e.target.value}})} onKeyUp = {handleFixName} placeholder = 'Title...' autoComplete = 'on' required/>
              <label htmlFor = 'jobDescription' ><h3>Description (Characters remaining: {description.maxLength - description.currentLength}):</h3></label>
              <textarea id = 'jobDescription' className = {!description.isValid ? 'inputError' : ''} onChange = {e => setDescription(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} placeholder = 'Tell us about the job...' maxLength = {description.maxLength} style = {{height: '100px'}}/>

              <label htmlFor = 'jobIndustry'><h3>Industry:</h3></label>
              <select id = 'jobIndustry' onChange = {e => setIndustry({value: e.target.value})} autoComplete = 'on'>
                  <option value = 'Any'>Any</option>
                  <option value = 'Beauty'>Beauty</option>
                  <option value = 'Construction'>Construction</option>
                  <option value = 'Information Technology'>Information Technology</option>
              </select>
              <label><h3>Roles of the job:</h3></label>
              <input className = {roles.alreadyExists || roles.isEmpty ? 'inputError' : ''}  onChange = {handleSetRoles} value = {roles.currentVal} placeholder = 'E.g Managing files...' autoComplete = 'on' required/>

              <List name = 'Roles' 
              state = {roles}
              handleAdd = {() => setRoles(prev => ({...prev, value: [...prev.value, roles.currentVal]}))}
              handleClearInput = {() => setRoles(prev => {return {...prev,currentVal: ''}})}
              handleSetIsEmpty = {(empty = true) => setRoles(prev => {return{...prev,isEmpty: empty}})}
              handleSetAlreadyExists = {(exists = true) => setRoles(prev => {return {...prev,alreadyExists: exists}})}
              handleSetAll = {(newItems: Array<string>) => setRoles(prev => {return {...prev,value: newItems}})}
              />

              <label htmlFor = 'skills'><h3>Skills required:</h3></label>
              <input id = 'skills' className = {skills.alreadyExists || skills.isEmpty ? 'inputError' : ''} value = {skills.currentVal} onChange = {handleSetSkills} placeholder = 'E.g Good problem solving...' autoComplete = 'on'/>

              <List name = 'Skills' 
              state = {skills}
              handleAdd = {() => setSkills(prev => ({...prev, value: [...prev.value, skills.currentVal]}))}
              handleClearInput = {() => setSkills(prev => {return {...prev,currentVal: ''}})}
              handleSetIsEmpty = {(empty = true) => setSkills(prev => {return{...prev,isEmpty: empty}})}
              handleSetAlreadyExists = {(exists = true) => setSkills(prev => {return {...prev,alreadyExists: exists}})}
              handleSetAll = {(newItems: Array<string>) => setSkills(prev => {return {...prev,value: newItems}})}
              />

              <label htmlFor = 'jobType'><h3>Type:</h3></label>
              <select id = 'jobType' onChange = {e => setType({value: e.target.value})} style = {{width: '130px'}}> 
                <option value = 'Full=time'>Full-time</option>
                <option value = 'Part-time'>Part-time</option>
                <option value = 'Contract'>Contract</option>
              </select>
                  
                <br/>
                <br/>

               <hr className = 'mt-0-mb-4'/>
              <label><h3>Salary:</h3></label>

              <label htmlFor = 'jobCurrency'><h4>Currency:</h4></label>
              <select id = 'jobCurrency' style = {{width:'65px'}} onChange = {e => setCurrency({value: e.target.value})}>
                <option value = '&#36;'>&#36;</option>
                <option value = '&#163;'>&#163;</option>
                <option value = '&#165;'>&#165;</option>
                <option value = '&#x20B9;'>&#x20B9;</option>
                <option value = '&#8363;'>&#8363;</option>
              </select>

              <label><h4>From:</h4></label>
              <input placeholder = 'E.g 20000' onChange = {e => setSalary1(prev => {return {...prev, value: e.target.value}})} autoComplete = 'on' required/>
              <label><h4>To:</h4></label>
              <input placeholder = 'E.g 30000' onChange = {e => setSalary2(prev => {return {...prev, value: e.target.value}})} autoComplete = 'on' required/>
              <br/>
              <br/>
              <hr className = 'mt-0-mb-4'/>
              <label htmlFor = 'jobPositions'><h3>Number of positions:</h3></label>
              <input type = 'number' id = 'jobPositions'  onChange = {e => setPositions(prev => {return {...prev, value: parseInt(e.target.value)}})} min = '1' defaultValue = '1' required style = {{width: '65px'}}/>

              <label><h3>Benefits:</h3></label>
              <input className = {benefits.alreadyExists || benefits.isEmpty ? 'inputError' : ''}  onChange = {handleSetBenefits} value = {benefits.currentVal} placeholder = 'E.g Free parking...' autoComplete = 'on' required/>

              <List name = 'Benefits' 
              state = {benefits}
              handleAdd = {() => setBenefits(prev => ({...prev, value: [...prev.value, benefits.currentVal]}))}
              handleClearInput = {() => setBenefits(prev => {return {...prev,currentVal: ''}})}
              handleSetIsEmpty = {(empty = true) => setBenefits(prev => {return{...prev,isEmpty: empty}})}
              handleSetAlreadyExists = {(exists = true) => setBenefits(prev => {return {...prev,alreadyExists: exists}})}
              handleSetAll = {(newItems: Array<string>) => setBenefits(prev => {return {...prev,value: newItems}})}
              />

              <label htmlFor = 'jobRemote'><h3>Remote:</h3></label>
              <select id = 'jobRemote' style = {{width:'80px'}}onChange = {e => e.target.value === 'Yes' ? setIsTrainingProvided(true) : setIsTrainingProvided(false)}>
                  <option value = 'Yes'>Yes</option>
                  <option value = 'No'>No</option>
              </select>
            </div>

            <div className = {`tab ${currentTab === 2 ? 'show' : 'hide'}`}>
                <h1 className = 'title'>Requirements</h1> 
                <hr className = 'mt-0-mb-4'/>

                <label htmlFor = 'workingDays'><h3>Working days:</h3></label>

                  <select id = 'workingDays' style = {{width:'auto'}}>
                    <option value = 'Monday'>Monday</option>
                    <option value = 'Tuesday'>Tuesday</option>
                    <option value = 'Wednesday'>Wednesday</option>
                    <option value = 'Thursday'>Thursday</option>
                    <option value = 'Friday'>Friday</option>
                    <option value = 'Saturday'>Saturday</option>
                    <option value = 'Sunday'>Sunday</option>
                  </select>
                  
                  <span style = {{marginLeft:'10px',marginRight:'10px'}}>to</span>

                  <select id = 'workingDays' defaultValue = 'Friday' style = {{width:'auto'}}>
                    <option value = 'Monday'>Monday</option>
                    <option value = 'Tuesday'>Tuesday</option>
                    <option value = 'Wednesday'>Wednesday</option>
                    <option value = 'Thursday'>Thursday</option>
                    <option value = 'Friday'>Friday</option>
                    <option value = 'Saturday'>Saturday</option>
                    <option value = 'Sunday'>Sunday</option>
                  </select>

                <label htmlFor = 'workingHours'><h3>Working hours:</h3></label>
                <input type = 'number' id = 'jobPositions'  onChange = {e => setWorkingHours(prev => {return {...prev, value: parseInt(e.target.value)}})} min = '1' max = '12' defaultValue = '6' required style = {{width: '65px'}}/>


                <label htmlFor = 'startDate'><h3>Expected start date:</h3></label>
                <input type = 'date' id = 'startDate' min = {getcurrentDate()} required/>
              
                <label htmlFor = 'jobEducation'><h3>Education:</h3></label>
                    <select id = 'jobEducation' onChange = {e => setEducation({value: e.target.value})} required>
                        <option value = 'No formal education'>No formal education</option>
                        <option value = 'Primary education'>Primary education</option>
                        <option value = 'Secondary education'>Secondary education or high school</option>
                        <option value = 'GED'>GED</option>
                        <option value = 'Vocational qualification'>Vocational qualification</option>
                        <option value = 'A-levels'>A-levels</option>
                        <option value = "Bachelor's degree">Bachelor's degree</option>
                        <option value = "Master's degree">Master's degree</option>
                        <option value = 'Doctorate or higher'>Doctorate or higher</option>
                    </select>
                  
                <label htmlFor = 'applicationPreference'><h3>Apply on here:</h3></label>
                <select id = 'applicationPreference' style = {{width: '80px'}} onChange = {e => e.target.value === 'No' ? setApplyOnOwnWebsite(true) : setApplyOnOwnWebsite(false)}>
                  <option value = 'Yes'>Yes</option>
                  <option value = 'No'>No</option>
                </select>

                {applyOnOwnWebsite ? 
                  <div>
                    <label htmlFor = 'jobWebsite'><h3>Job link:</h3></label>
                    <input id = 'jobWebsite' type = 'url' placeholder = 'Job link...' onChange = {e => setWebsite(prev => {return {...prev, value: e.target.value}})}/>
                  </div>
                : null}

            </div>

            {currentTab === maxTabs ? <button type = 'button' id = 'submit' onClick = {validateForm}>Submit</button> : <button type = 'button' className = 'toggleTabBtn' onClick = {() => setCurrentTab(currentTab + 1)} style = {{float:'right'}}>Next</button>}
            <button type = 'button' className = {currentTab > 1 ? 'toggleTabBtn' : 'hide'} onClick = {handleToPrevTab}>Previous</button>
        </form>

    </div>
  )
}
