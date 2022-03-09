import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import Errors from '../../Global/messages/Errors'
import {FieldProps,TextFieldProps} from '../../Global/types/forms';
import {ListProps} from '../../Global/types/forms';
import {handleFixName} from '../../Global/formFunctions';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'
import axios from 'axios';

export default function JobFormPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const [currentTab,setCurrentTab] = useState(1)
  const [errors,setErrors] = useState<Array<string>>([])
  const [title,setTitle] = useState({value: '', isValid: true, errorMsg: 'Title is invalid'})
  const [description,setDescription] = useState({value: '', isValid: true, errorMsg: 'Experience section is invalid',currentLength: 0, maxLength: 800})
  const [salary,setSalary] = useState({value: ''})
  const [roles,setRoles] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid Role', alreadyExists: false, alreadyExistsMsg: 'Role already exists',AddedMsg:'Role added',RemovedMsg: 'Role removed'})
  const [industry,setIndustry] = useState({value: 'Any'})
  const [isRemote,setIsRemote] = useState(false)
  const [isTrainingProvided,setIsTrainingProvided] = useState(false)
  const [positions,setPositions] = useState(1)
  const [education,setEducation] = useState({value: 'No formal education'})
  const [skills,setSkills] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid skill', alreadyExists: false, alreadyExistsMsg: 'Skill already exists',AddedMsg:'Skill added',RemovedMsg: 'Skill removed'})
  const [startDate,setStartDate] = useState({value: ''})
  const [benefits,setBenefits] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid benefit', alreadyExists: false, alreadyExistsMsg: 'Role already exists',AddedMsg:'benefit added',RemovedMsg: 'Benefit removed'})
  const [workingDays,setWorkingDays] = useState({value: 'Monday-Wednesday'})
  const [workingHours,setWorkingHours] = useState({value: 6})

  const maxTabs = document.querySelectorAll('.tab').length

  return (
    <div>
        <div className = 'steps'>
            <span className = {`step ${currentTab === 1 ? 'active' : currentTab > 1 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(1) : null}><p className = 'step-label'>About</p></span>
            <span className = {`step ${currentTab === 2 ? 'active' : currentTab > 2 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(2) : null}><p className = 'step-label'>Requirements</p></span>
            <span className = {`step ${currentTab === 3 ? 'active' : currentTab > 3 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(3) : null}><p className = 'step-label'>Preferences</p></span>
            <span className = {`step ${currentTab === 4 ? 'active' : currentTab > 4 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(4) : null}><p className = 'step-label'>Other</p></span>
        </div>

        <form>
            <div className = {`tab ${currentTab === 1 ? 'show' : 'hide'}`}>
              <h1 className = 'title'>About</h1> 
              <Errors errors = {errors}/>
              <label htmlFor = 'jobTitle'><h3>Title:</h3></label>
              <input id = 'jobTitle' className = {!title.isValid ? 'inputError' : ''} onChange = {e => setTitle(prev => {return {...prev, value: e.target.value}})} onKeyUp = {handleFixName} placeholder = 'Title...' autoComplete = 'on' required/>
              <label htmlFor = 'jobDescription' ><h3>Description(Characters remaining: {description.maxLength - description.currentLength}):</h3></label>
              <textarea id = 'jobDescription' className = {!description.isValid ? 'inputError' : ''} onChange = {e => setDescription(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} placeholder = 'Tell us about the job' maxLength = {description.maxLength} style = {{height:'100px'}}/>
              <label htmlFor = 'salary'><h3>Salary:</h3></label>
            </div>
        </form>

    </div>
  )
}
