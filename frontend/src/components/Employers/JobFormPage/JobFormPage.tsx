import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import Errors from '../../Global/messages/Errors'
import {ListProps} from '../../Global/types/forms';
import {useAppDispatch, useAppSelector} from '../../../app/hooks'
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert';
import {getcurrentDate} from '../../Global/formFunctions';
import {capitalizeFirstCharacter} from '../../Global/formFunctions';
import List from '../../Global/Forms/List';
import {token} from '../../../features/Auth/user';
import {fetchJob} from '../../../features/Employers/jobs/job';
import JobSkillsForm from './JobSkillsForm';
import ReactScrollableFeed from 'react-scrollable-feed';
import Popup from '../../Global/Popup/Popup';
import JobSkillsList from './JobSkillsList';
import axios from 'axios';

export default function JobFormPage({edit = false}) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const job = useAppSelector(state => state.job)
  const [currentTab,setCurrentTab] = useState(1)
  const [errors,setErrors] = useState<Array<string>>([])
  const [title,setTitle] = useState({value: '' , isValid: true, errorMsg: 'Title is invalid', lengthErrorMsg: 'Length must be 60 characters or shorter'})
  const [description,setDescription] = useState({value: '', isValid: true, errorMsg: 'Description section is invalid',currentLength: 0, maxLength: 300})
  const [salary1,setSalary1] = useState({value: '', isValid: true, errorMsg: 'Salary 1 value is invalid'})
  const [salary2,setSalary2] = useState({value: '', isValid: true, errorMsg: 'Salary 2 value is invalid'})
  const [currency,setCurrency] = useState({value: '$'})
  const [roles,setRoles] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid role', alreadyExists: false, alreadyExistsMsg: 'Role already exists',AddedMsg:'Role added',RemovedMsg: 'Role removed'})
  const [industry,setIndustry] = useState({value: 'Any'})
  const [isRemote,setIsRemote] = useState(false)
  const [isTrainingProvided,setIsTrainingProvided] = useState(false)
  const [positions,setPositions] = useState({value: '1', isValid: true, errorMsg: 'Positions value is invalid'})
  const [education,setEducation] = useState({value: 'No formal education'})
  const [skills,setSkills] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid skill', alreadyExists: false, alreadyExistsMsg: 'Skill already exists',AddedMsg:'Skill added',RemovedMsg: 'Skill removed'})
  const [experience,setExperience] = useState({value: [{description: '', years: '0', isRequired: false}], popup: false, currentVal: {description: '', years: '0', isRequired: false}, isValid: true, currentErrorMsg: '', emptyErrorMsg: 'Experience is invalid', alreadyExistsMsg: 'Experience already exists'})
  const [startDate,setStartDate] = useState({value: '',isValid: true, errorMsg: 'Start date is invalid'})
  const [benefits,setBenefits] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid benefit', alreadyExists: false, alreadyExistsMsg: 'Benefit already exists',AddedMsg:'benefit added',RemovedMsg: 'Benefit removed'})
  const [workingDay1,setWorkingDay1] = useState({value: 'Monday'})
  const [workingDay2,setWorkingDay2] = useState({value: 'Friday'})
  const [workingHours,setWorkingHours] = useState({value: '6',isValid: true, errorMsg: 'working hours value is invalid'})
  const [applyOnOwnWebsite,setApplyOnOwnWebsite] = useState(false)
  const [link,setLink] = useState({value: '',isValid: true, errorMsg: 'Website URL is invalid'})
  const [type,setType] = useState({value: 'Full-time'})
  const {jobID} = useParams()

  const maxTabs = document.querySelectorAll('.tab').length

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!edit) return
    dispatch(fetchJob(Number(jobID)))
    .then(response => {
      if (response.meta.requestStatus === 'rejected') navigate('/jobs')
  })

    setTitle(prev => {return{...prev, value: job.values?.title}})
    setDescription(prev => {return{...prev, value: job.values?.description}})
    setSalary1(prev => {return{...prev, value: job.values?.salary1}})
    setSalary2(prev => {return{...prev, value: job.values?.salary2}})
    setCurrency({value: job.values?.currency})
    setRoles(prev => {return{...prev, value: job.values?.roles.map(role => role.name)}})
    setSkills(prev => {return{...prev, value: job.values?.skills.map(skill => skill.name)}})
    setBenefits(prev => {return{...prev, value: job.values?.benefits.map(benefit => benefit.name)}})
    setIndustry({value: job.values?.industry})
    setIsRemote(job.values?.remote)
    setIsTrainingProvided(job.values?.training)
    setPositions(prev => {return{...prev, value: job.values?.positions}})
    setStartDate(prev => {return{...prev, value: job.values?.startDate}})
    setEducation({value: job.values?.education})
    setWorkingDay1(prev => {return{...prev, value: job.values?.workingDay1}})
    setWorkingDay2(prev => {return{...prev, value: job.values?.workingDay2}})
    setWorkingHours(prev => {return{...prev, value: job.values?.workingHours}})
    setApplyOnOwnWebsite(job.values?.applyOnOwnWebsite)
    setLink(prev => {return{...prev, value: job.values?.link}})
    setType(prev => {return{...prev, value: job.values?.type}})

  },[jobID, 
    dispatch, 
    edit, 
    job.values.title, 
    job.values.salary1,
    job.values.salary2,
    job.values.currency,
    job.values.description,
    job.values.positions, 
    job.values.startDate,
    job.values.education,
    job.values.workingDay1,
    job.values.workingDay2,
    job.values.industry,
    job.values.workingHours,
    job.values.remote,
    job.values.training,
    job.values.applyOnOwnWebsite,
    job.values.link,
    job.values.type
    ])
  
  function handleToPrevTab(){
    setErrors([])
    setCurrentTab(currentTab - 1)
}

function handleSetRole(e: React.ChangeEvent<HTMLInputElement>){
  setRoles(prev => {return {...prev, currentVal: e.target.value}})
  e.target.value = e.target.value.replace(',','')
}

function handleSetSkills(e: React.ChangeEvent<HTMLInputElement>){
  setSkills(prev => {return {...prev, currentVal: e.target.value}})
  e.target.value = e.target.value.replace(',','')
}

function handleSetExperience(e: React.ChangeEvent<HTMLTextAreaElement>){
  setExperience(prev => ({
    ...prev,
    currentVal: {...prev.currentVal, description: e.target.value}
  }))
  e.target.value = e.target.value.replace(',','')
}

function handleSetBenefit(e: React.ChangeEvent<HTMLInputElement>){
  setBenefits(prev => {return {...prev, currentVal: e.target.value}})
  e.target.value = e.target.value.replace(',','')
}

const validateForm = () => {
  let isValid = true
  let errors: Array<string> = []
  const urlregex = /((([A-Za-z]{3,9}:(?:)?)(?:[;:&=,\w]+@)?[A-Za-z0-9]+|(?:www|[;:&=,\w]+@)[A-Za-z0-9]+)((?:[~%\w_]*)?\??(?:[=&;%@\w_]*)#?(?:[\\\w]*))?)/
  const numbers = /^(([1-9]\d*))$/;

  switch(currentTab){
    case 1:
      if (title.value === ''){
          setTitle(prev => {return {...prev,isValid: false}})
          errors.push(title.errorMsg)
          isValid = false
      }

      else if (title.value.length > 60){
            setTitle(prev => {return {...prev,isValid: false}})
            errors.push(title.lengthErrorMsg)
            isValid = false
      }

      else setTitle(prev => {return {...prev,isValid: true}})

      if (description.value === ''){
          setDescription(prev => {return {...prev,isValid: false}})
          errors.push(description.errorMsg)
          isValid = false
      }

      else setDescription(prev => {return {...prev,isValid: true}})

      if (roles.value.length === 0){
          setRoles(prev => {return {...prev,isEmpty: true}})
          errors.push(roles.emptyErrorMsg)
          isValid = false
      }

      else setRoles(prev => {return {...prev,isEmpty: false}})

      if (!salary1.value.match(numbers)){
          setSalary1(prev => {return {...prev,isValid: false}})
          errors.push(salary1.errorMsg)
          isValid = false
      }

      else setSalary1(prev => {return {...prev,isValid: true}})

      if (salary2.value !== '' && !salary2.value.match(numbers)){
          setSalary2(prev => {return {...prev,isValid: false}})
          errors.push(salary2.errorMsg)
          isValid = false
      }

     if (parseInt(salary1.value) >= parseInt(salary2.value)){
          setSalary2(prev => {return {...prev,isValid: false}})
          errors.push('Salary 2 must be greater than salary 1')
          isValid = false
      }

      else setSalary2(prev => {return {...prev,isValid: true}})


      if (!positions.value.match(numbers)){
          setPositions(prev => {return {...prev,isValid: false}})
          errors.push(positions.errorMsg)
          isValid = false
      }

      else setPositions(prev => {return {...prev,isValid: true}})

      if (link.value !== '' && !link.value.match(urlregex) && link.value !== ''){
        setLink(prev => {return {...prev,isValid: false}})
        errors.push(link.errorMsg)
        isValid = false
       }

      else setLink(prev => {return {...prev,isValid: true}})

      break

      case 2:
        if (startDate.value === ''){
          setStartDate(prev => {return {...prev,isValid: false}})
          errors.push(startDate.errorMsg)
          isValid = false
        }

        else setStartDate(prev => {return {...prev,isValid: true}})
  }

  if (!isValid){
    setErrors(errors)
    window.scrollTo(0, 0)
    return
}
  
  setErrors([])
  setCurrentTab(currentTab + 1)

  return isValid
}

function handleSubmitForm(e: React.SyntheticEvent){
  e.preventDefault()

  if(!validateForm()) return
  const requestOptions = {
    headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
  }

  let form = new FormData()

  form.append('title',title.value)
  form.append('description',description.value)
  form.append('salary1', salary1.value)
  if (salary2.value) form.append('salary2',salary2.value)
  form.append('currency', currency.value)
  form.append('roles',roles.value.toString())
  form.append('industry',industry.value)
  form.append('remote',isRemote.toString())
  form.append('type', type.value)
  form.append('training',isTrainingProvided.toString())
  form.append('positions',positions.value)
  form.append('education',education.value)
  form.append('experience', JSON.stringify(experience.value.slice(1)))
  form.append('skills',skills.value.toString())
  form.append('startDate',startDate.value)
  form.append('benefits',benefits.value.toString())
  form.append('workingDay1',workingDay1.value)
  form.append('workingDay2',workingDay2.value)
  form.append('workingHours',workingHours.value)
  form.append('link',link.value)
  form.append('applyOnOwnWebsite',applyOnOwnWebsite.toString())

  if (edit){
    axios.put(`/api/job?id=${jobID}`,form,requestOptions)
    .then(response => {
      if (response.status === 200){
          handleAddSuccessMsg('Job is successfully saved', dispatch)
          navigate(`/job/${jobID}`)
      }
  })

    .catch(error => {
        if (error.response.status === 400) setErrors(['Something went wrong'])
    })
  }

  else{
    axios.post('/api/job',form,requestOptions)
    .then(response => {
      if (response.status === 201){
          handleAddSuccessMsg('Job is successfully saved', dispatch)
          navigate(`/jobs`)
      }
  })
  
    .catch(error => {
        if (error.response.status === 400) setErrors(['Something went wrong'])
    })
  }

}

function handleAddExperience(){
  if (experience.value.find(exp => exp.description === experience.currentVal.description && exp.description)) {
    setExperience(prev => {return{...prev, isValid: false, currentErrorMsg: experience.alreadyExistsMsg}})
    return
  }

  if (!experience.currentVal.description) {
    setExperience(prev => {return{...prev, isValid: false, currentErrorMsg: experience.emptyErrorMsg}})
    return
  }

  setExperience(prev => ({
    ...prev,
    value: [...prev.value, {
      description: experience.currentVal.description, 
      years: experience.currentVal.years || '0', 
      isRequired: experience.currentVal.isRequired}]
  }))

  setExperience(prev => {return{...prev, isValid: true, popup: false, currentVal: {description: '', years: '0', isRequired: false}}})
  setErrors([])
}

function handleRemoveExperience(idx: number){
  const newExperience = [...experience.value]
  newExperience.splice(idx, 1)
  setExperience(prev => {return{...prev, value: newExperience}})
} 

  return (
    <div className = 'normalForm'>
        <div className = 'steps'>
            <span className = {`step ${currentTab === 1 ? 'active' : currentTab > 1 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(1) : null}><p className = 'step-label'>About</p></span>
            <span className = {`step ${currentTab === 2 ? 'active' : currentTab > 2 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(2) : null}><p className = 'step-label'>Requirements</p></span>
        </div>


            <div className = {`tab ${currentTab === 1 ? 'show' : 'hide'}`}>
              <h1 className = 'title'>About</h1> 
              <hr className = 'mt-0-mb-4'/>
              <Errors errors = {errors}/>
              <label htmlFor = 'jobTitle'><h3>Title:</h3></label>
              <input id = 'jobTitle' value = {title.value} className = {!title.isValid ? 'inputError' : ''} onChange = {e => setTitle(prev => {return {...prev, value: e.target.value}})} onKeyUp = {capitalizeFirstCharacter} placeholder = 'Title...' autoComplete = 'on' required/>
              <label htmlFor = 'jobDescription' ><h3>Description (Characters remaining: {description.maxLength - description.currentLength}):</h3></label>
              <textarea id = 'jobDescription' value = {description.value} className = {!description.isValid ? 'inputError' : ''} onChange = {e => setDescription(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} onKeyUp = {capitalizeFirstCharacter} placeholder = 'Tell us about the job...' maxLength = {description.maxLength} style = {{height: '100px'}}/>

              <label htmlFor = 'jobIndustry'><h3>Industry:</h3></label>
  
              <select id = 'jobIndustry' value = {industry.value} onChange = {e => setIndustry({value: e.target.value})} autoComplete = 'on'>
                  <option value = 'Any'>Any</option>
                  <option value = 'Beauty'>Beauty</option>
                  <option value = 'Construction'>Construction</option>
                  <option value = 'Information Technology'>Information Technology</option>
              </select>
              <label><h3>Roles of the job:</h3></label>
              <input className = {roles.alreadyExists || roles.isEmpty ? 'inputError' : ''}  onChange = {handleSetRole} value = {roles.currentVal} placeholder = 'E.g Managing files...' autoComplete = 'on' required/>
              <List name = 'Roles' 
              state = {roles}
              handleAdd = {() => setRoles(prev => ({...prev, value: [...prev.value, roles.currentVal]}))}
              handleClearInput = {() => setRoles(prev => {return {...prev,currentVal: ''}})}
              handleSetIsEmpty = {(empty = true) => setRoles(prev => {return{...prev,isEmpty: empty}})}
              handleSetAlreadyExists = {(exists = true) => setRoles(prev => {return {...prev,alreadyExists: exists}})}
              handleSetAll = {(newItems: Array<string>) => setRoles(prev => {return {...prev,value: newItems}})}
              />

              <label htmlFor = 'jobType'><h3>Type:</h3></label>
              <select id = 'jobType' value = {type.value} onChange = {e => setType({value: e.target.value})} style = {{width: '130px'}}> 
                <option value = 'Full-time'>Full-time</option>
                <option value = 'Part-time'>Part-time</option>
                <option value = 'Contract'>Contract</option>
              </select>
                  
                <br/>
                <br/>

               <hr className = 'mt-0-mb-4'/>
              <label><h3>Salary:</h3></label>

              <label htmlFor = 'jobCurrency'><h4>Currency:</h4></label>
              <select id = 'jobCurrency' value = {currency.value} style = {{width:'65px'}} onChange = {e => setCurrency({value: e.target.value})}>
                <option value = '&#36;'>&#36;</option>
                <option value = '&#163;'>&#163;</option>
                <option value = '&#165;'>&#165;</option>
                <option value = '&#x20B9;'>&#x20B9;</option>
                <option value = '&#8363;'>&#8363;</option>
              </select>

              <label><h4>From:</h4></label>
              <input placeholder = 'E.g 20000' value = {salary1.value} onChange = {e => setSalary1(prev => {return {...prev, value: e.target.value}})} className = {!salary1.isValid ? 'inputError' : ''} autoComplete = 'on' required/>
              <label><h4>To (Optional):</h4></label>
              <input placeholder = 'E.g 30000' value = {salary2.value} onChange = {e => setSalary2(prev => {return {...prev, value: e.target.value}})} className = {!salary2.isValid ? 'inputError' : ''} autoComplete = 'on'/>
              <br/>
              <br/>
              <hr className = 'mt-0-mb-4'/>
              <label htmlFor = 'jobPositions'><h3>Number of positions:</h3></label>
              <input type = 'number' className = {!positions.isValid ? 'inputError' : ''} id = 'jobPositions'  onChange = {e => setPositions(prev => {return {...prev, value: e.target.value}})} min = '1' value = {positions.value} required/>

              <label><h3>Benefits (Optional):</h3></label>
              <input className = {benefits.alreadyExists || benefits.isEmpty ? 'inputError' : ''} onChange = {handleSetBenefit} value = {benefits.currentVal} placeholder = 'E.g Free parking...' autoComplete = 'on' required/>
              <List name = 'Benefits'
              state = {benefits}
              handleAdd = {() => setBenefits(prev => ({...prev, value: [...prev.value, benefits.currentVal]}))}
              handleClearInput = {() => setBenefits(prev => {return {...prev,currentVal: ''}})}
              handleSetIsEmpty = {(empty = true) => setBenefits(prev => {return{...prev,isEmpty: empty}})}
              handleSetAlreadyExists = {(exists = true) => setBenefits(prev => {return {...prev,alreadyExists: exists}})}
              handleSetAll = {(newItems: Array<string>) => setBenefits(prev => {return {...prev,value: newItems}})}
              />

              <label htmlFor = 'jobRemote'><h3>Remote:</h3></label>
              <input type = 'checkbox' id = 'jobRemote' checked = {isRemote} onChange = {e => setIsRemote(e.target.checked)}/>
          
              <label htmlFor = 'jobTraining'><h3>Training Provided:</h3></label>
              <input type = 'checkbox' id = 'jobTraining' checked = {isTrainingProvided} onChange = {e => setIsTrainingProvided(e.target.checked)}/>
            </div>

            <div className = {`tab ${currentTab === 2 ? 'show' : 'hide'}`}>
                <h1 className = 'title'>Requirements</h1> 
                <JobSkillsForm popupOff = {() => null} isIsolated = {false} toggleTab = {() => setCurrentTab(currentTab + 1)}/>
                <hr className = 'mt-0-mb-4'/>
                <h4>Skills ({job.values?.skills.length}):</h4>
                <JobSkillsList skills = {job.values?.skills}/>

                <label htmlFor = 'experience'><h3>Experience required (Optional):</h3></label>
                <button type = 'button' style = {{marginTop:'20px', display: 'block'}} onClick = {() => setExperience(prev => {return{...prev, popup: true}})}>Add</button>

                <Popup trigger = {experience.popup} switchOff = {() => setExperience(prev => {return{...prev, popup: false}})} modalOn = {false}>
                  <h2>Add Experience:</h2>

                  <p className = 'error'>{!experience.isValid ? <li>{experience.currentErrorMsg}</li> : null}</p>

                  <label><h4>Description:</h4></label>
                  <textarea id = 'experienceDescription' onChange = {handleSetExperience} value = {experience.currentVal.description} className = {!experience.isValid ? 'inputError' : ''}  placeholder = 'E.g Developing mobile apps...' autoComplete = 'on'/>

                  <label><h4>Number of years:</h4></label>
                  <input type = 'number' value = {experience.currentVal.years} onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, years: e.target.value}}))} id = 'experienceYears' min = '0' max = '10' autoComplete = 'on'/>
                 
                  <div style = {{display: 'flex', alignItems: 'center'}}>
                    <label><h4>Required:</h4></label>
                    <input type = 'checkbox' id = 'experienceRequired' defaultValue = 'No'  onChange = {e => setExperience(prev => ({...prev,currentVal: {...prev.currentVal, isRequired: e.target.checked}}))}/>
                  </div>
                   
                  <button type = 'button' onClick = {handleAddExperience}>Submit</button>
                  <button onClick = {() => setExperience(prev => {return{...prev, popup: false}})}>Cancel</button>
                </Popup>

                <div className = 'list longerList'>
                <ReactScrollableFeed>
                {experience.value.slice(1).map((exp, index) => {
                  return (
                    <div key = {index}>
                        <table style = {{marginTop: '20px'}}>
                        <tbody>
                          <tr>
                            <th>No</th>
                            <th>Experience</th>
                            <th>Years</th>
                            <th>Required</th>
                          </tr>

                          <tr>
                            <td>{index + 1}</td>
                            <td>{exp.description}</td>
                            <td>{exp.years}</td>
                            <td>{exp.isRequired ? 'Yes' : 'No'}</td>
                            <td><span>&#9998;</span></td>
                            <td><span onClick = {() => handleRemoveExperience(index)} className = 'cross'>X</span></td>
                          </tr>
                        </tbody>
                        </table>
                        
                        </div>
                  )
                })}
                </ReactScrollableFeed>
                </div>
                
                 <hr className = 'mt-0-mb-4'/>

                <label><h3>Working days:</h3></label>

                  <select id = 'workingDay1' value = {workingDay1.value} onChange  = {e => setWorkingDay1(prev => {return{...prev, value: e.target.value}})} style = {{width:'auto'}}>
                    <option value = 'Monday'>Monday</option>
                    <option value = 'Tuesday'>Tuesday</option>
                    <option value = 'Wednesday'>Wednesday</option>
                    <option value = 'Thursday'>Thursday</option>
                    <option value = 'Friday'>Friday</option>
                    <option value = 'Saturday'>Saturday</option>
                    <option value = 'Sunday'>Sunday</option>
                  </select>
                  
                  <span style = {{marginLeft:'10px',marginRight:'10px'}}>to</span>
              
                  <select id = 'workingDay2' value = {workingDay2.value} onChange  = {e => setWorkingDay2(prev => {return{...prev, value: e.target.value}})} style = {{width:'auto'}}>
                    <option value = 'Monday'>Monday</option>
                    <option value = 'Tuesday'>Tuesday</option>
                    <option value = 'Wednesday'>Wednesday</option>
                    <option value = 'Thursday'>Thursday</option>
                    <option value = 'Friday'>Friday</option>
                    <option value = 'Saturday'>Saturday</option>
                    <option value = 'Sunday'>Sunday</option>
                    <option value = ''>None</option>
                  </select>

                <label htmlFor = 'workingHours'><h3>Working hours:</h3></label>
                <input type = 'number' className = {!workingHours.isValid ? 'inputError' : ''} value = {workingHours.value} id = 'jobPositions'  onChange = {e => setWorkingHours(prev => {return {...prev, value: e.target.value}})} min = '1' max = '12'  required/>

                <label htmlFor = 'startDate'><h3>Expected start date:</h3></label>
                <input type = 'date' className = {!startDate.isValid ? 'inputError' : ''} value = {startDate.value} id = 'startDate' min = {getcurrentDate()} onChange = {e => setStartDate(prev => {return {...prev, value: e.target.value}})} required/>
              
                <label htmlFor = 'jobEducation'><h3>Education:</h3></label>
                    <select id = 'jobEducation' value = {education.value} onChange = {e => setEducation({value: e.target.value})} required>
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
                <input type = 'checkbox' id = 'applicationPreference' checked = {applyOnOwnWebsite} onChange = {e => setApplyOnOwnWebsite(e.target.checked)}/>
                {applyOnOwnWebsite ? 
                  <div>
                    <label htmlFor = 'jobLink'><h3>Job link:</h3></label>
                    <input id = 'jobLink' value = {link.value} className = {!link.isValid ? 'inputError' : ''} type = 'url' placeholder = 'Job link...' onChange = {e => setLink(prev => {return {...prev, value: e.target.value}})}/>
                  </div>
                : null}

            </div>

            {currentTab === maxTabs ? <button type = 'button' id = 'submit' onClick = {handleSubmitForm}>Submit</button> : <button type = 'button' className = 'toggleTabBtn' onClick = {validateForm} style = {{float:'right'}}>Next</button>}
            <button type = 'button' className = {currentTab > 1 ? 'toggleTabBtn' : 'hide'} onClick = {handleToPrevTab}>Previous</button>

    </div>
  )
}
