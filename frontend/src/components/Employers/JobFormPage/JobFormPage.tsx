import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Errors from '../../Global/messages/Errors'
import {ListProps} from '../../Global/types/forms';
import {handleFixName} from '../../Global/formFunctions';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import ReactScrollableFeed from 'react-scrollable-feed';
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
  const [positions,setPositions] = useState({value: '1', errorMsg: 'Positions value is invalid'})
  const [education,setEducation] = useState({value: 'No formal education'})
  const [skills,setSkills] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid skill', alreadyExists: false, alreadyExistsMsg: 'Skill already exists',AddedMsg:'Skill added',RemovedMsg: 'Skill removed'})
  const [startDate,setStartDate] = useState({value: ''})
  const [benefits,setBenefits] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid benefit', alreadyExists: false, alreadyExistsMsg: 'Role already exists',AddedMsg:'benefit added',RemovedMsg: 'Benefit removed'})
  const [workingDays,setWorkingDays] = useState({value: 'Monday-Wednesday'})
  const [workingHours,setWorkingHours] = useState({value: 6})

  const maxTabs = document.querySelectorAll('.tab').length

  function handleToPrevTab(){
    setErrors([])
    setCurrentTab(currentTab - 1)
}

function handleSetRoles(e: React.ChangeEvent<HTMLInputElement>){
  setRoles(prev => {return {...prev, currentVal: e.target.value}})
  e.target.value = e.target.value.replace(',','')
}

function handleAddRole(){
  const currentRole = roles.currentVal.trim()
  let errors: Array<string> = []

  if (currentRole.match(/^ *$/)) {
   setRoles(prev => {return {...prev,isEmpty: true}})
   errors.push(roles.emptyErrorMsg)
  }

  else setRoles(prev => {return {...prev,isEmpty: false}})

  if (roles.value.filter(role => role === currentRole).length > 0){
    setRoles(prev => {return {...prev,alreadyExists: true}})
   errors.push(roles.alreadyExistsMsg)
  }

  else setRoles(prev => {return {...prev,alreadyExists: false}})

  if (errors.length){
    setErrors(errors)
    return
  }
  
  setRoles(prev => ({...prev, value: [...prev.value,currentRole]}))
  setErrors([])
  setRoles(prev => {return {...prev,currentVal: ''}})
}

function handleRemoveRole(role: string){
  const newRoles= [...roles.value]
  let index = newRoles.findIndex(obj => obj === role)
  newRoles.splice(index,1)
  setRoles(prev => {return {...prev,value: newRoles}})
  setErrors([])
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

              <br/>
              <br/>
               <hr className = 'mt-0-mb-4'/>
              <label><h3>Salary:</h3></label>

              <label htmlFor = 'jobCurrency'><h4>Currency:</h4></label>
              <select id = 'jobCurrency' onChange = {e => setCurrency({value: e.target.value})}>
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
              <input type = 'number' id = 'jobPositions'  onChange = {e => setPositions(prev => {return {...prev, value: e.target.value}})} min = '1' defaultValue = {1} required style = {{width: '65px'}}/>
              <label htmlFor = 'jobRoles'><h3>Roles of the job:</h3></label>
            
              <input id = 'jobRoles' className = {roles.alreadyExists || roles.isEmpty ? 'inputError' : ''} value = {roles.currentVal} onChange = {handleSetRoles} placeholder = 'E.g Managing files...' autoComplete = 'on' required/>
              <button type = 'button' style = {{marginTop:'10px'}} onClick = {handleAddRole}>Add Role</button>
              <Errors errors = {errors}/>
              {roles.value.length ? <p>Roles ({roles.value.length}):</p> : null}

              <div className = 'list'>
                  <ReactScrollableFeed>
                  {roles.value.map((role,index) => {
                      return (
                      <div key = {index} style = {{display:'flex',justifyContent:'space-between'}}>
                          <li>{role}</li>
                          <button type = 'button' onClick = {() => handleRemoveRole(role)} style = {{padding:'10px'}}>Remove</button>
                      </div>
                      )
                  })}
                  </ReactScrollableFeed>
              </div>


            </div>

            <div className = {`tab ${currentTab === 2 ? 'show' : 'hide'}`}>
                
            </div>

            {currentTab === maxTabs ? <button type = 'button' id = 'submit' onClick = {validateForm}>Submit</button> : <button type = 'button' className = 'toggleTabBtn' onClick = {() => setCurrentTab(currentTab + 1)} style = {{float:'right'}}>Next</button>}
            <button type = 'button' className = {currentTab > 1 ? 'toggleTabBtn' : 'hide'} onClick = {handleToPrevTab}>Previous</button>
        </form>

    </div>
  )
}
