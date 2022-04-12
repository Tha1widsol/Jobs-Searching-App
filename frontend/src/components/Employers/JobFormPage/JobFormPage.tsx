import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import Errors from '../../Global/messages/Errors'
import {ListProps} from '../../Global/types/forms';
import {useAppDispatch, useAppSelector} from '../../Global/features/hooks'
import {setMessage} from '../../Global/features/successMsg';
import {getcurrentDate} from '../../Global/formFunctions';
import {capitalizeFirstCharacter} from '../../Global/formFunctions';
import List from '../../Global/Forms/List';
import {token} from '../../Global/features/Auth/user';
import {fetchJob} from '../../Global/features/Employers/jobs/job';
import axios from 'axios';

export default function JobFormPage({edit = false}) {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const job = useAppSelector(state => state.job)
  const [currentTab,setCurrentTab] = useState(1)
  const [errors,setErrors] = useState<Array<string>>([])
  const [title,setTitle] = useState({value: edit ? job.values?.title : '' , isValid: true, errorMsg: 'Title is invalid', lengthErrorMsg: 'Length must be 60 characters or shorter'})
  const [description,setDescription] = useState({value: edit ? job.values?.description : '', isValid: true, errorMsg: 'Experience section is invalid',currentLength: 0, maxLength: 300})
  const [salary1,setSalary1] = useState({value: edit ? job.values?.salary.split('-')[0].substring(1).trim() : '', isValid: true, errorMsg: 'Salary 1 value is invalid'})
  const [salary2,setSalary2] = useState({value: edit ? job.values?.salary.split('-')[1].substring(2).trim() : '', isValid: true, errorMsg: 'Salary 2 value is invalid'})
  const [currency,setCurrency] = useState({value: edit ? job.values?.salary[0] : '$'})
  const [roles,setRoles] = useState<ListProps>({value: edit ? job.values?.roles.map(role => role.name) : [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid role', alreadyExists: false, alreadyExistsMsg: 'Role already exists',AddedMsg:'Role added',RemovedMsg: 'Role removed'})
  const [industry,setIndustry] = useState({value: edit ? job.values?.industry : 'Any'})
  const [isRemote,setIsRemote] = useState(edit ? job.values?.remote ? true : false : false)
  const [isTrainingProvided,setIsTrainingProvided] = useState(edit ? job.values?.training ? true : false : false)
  const [positions,setPositions] = useState({value: edit ? job.values?.positions : '1', isValid: true, errorMsg: 'Positions value is invalid'})
  const [education,setEducation] = useState({value: edit ? job.values?.education : 'No formal education'})
  const [skills,setSkills] = useState<ListProps>({value: edit ? job.values?.skills.map(skill => skill.name) : [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid skill', alreadyExists: false, alreadyExistsMsg: 'Skill already exists',AddedMsg:'Skill added',RemovedMsg: 'Skill removed'})
  const [startDate,setStartDate] = useState({value: edit ? job.values?.startDate : '',isValid: true, errorMsg: 'Start date is invalid'})
  const [benefits,setBenefits] = useState<ListProps>({value: edit ? job.values?.benefits.map(benefit => benefit.name) : [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid benefit', alreadyExists: false, alreadyExistsMsg: 'Benefit already exists',AddedMsg:'benefit added',RemovedMsg: 'Benefit removed'})
  const [workingDay1,setWorkingDay1] = useState({value: edit ? job.values?.workingDays.split('-')[0] : 'Monday'})
  const [workingDay2,setWorkingDay2] = useState({value: edit ? job.values?.workingDays.split('-')[1] : 'Friday'})
  const [workingHours,setWorkingHours] = useState({value: edit ? job.values?.workingHours : '6',isValid: true, errorMsg: 'working hours value is invalid'})
  const [applyOnOwnWebsite,setApplyOnOwnWebsite] = useState(edit ? job.values?.applyOnOwnWebsite ? true : false : false)
  const [link,setLink] = useState({value: edit ? job.values?.link : '',isValid: true, errorMsg: 'Website URL is invalid'})
  const [type,setType] = useState({value: edit ? job.values?.type : 'Full-time'})
  const {jobID} = useParams()

  const maxTabs = document.querySelectorAll('.tab').length

  useEffect(() => {
    if (!edit) return
    dispatch(fetchJob(Number(jobID)))
  },[jobID, dispatch, edit])
  
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
  form.append('salary', `${currency.value}${salary1.value} - ${currency.value}${salary2.value}`)
  form.append('roles',roles.value.toString())
  form.append('industry',industry.value)
  form.append('remote',isRemote.toString())
  form.append('type', type.value)
  form.append('training',isTrainingProvided.toString())
  form.append('positions',positions.value)
  form.append('education',education.value)
  form.append('skills',skills.value.toString())
  form.append('startDate',startDate.value)
  form.append('benefits',benefits.value.toString())
  form.append('workingDays',`${workingDay1.value} - ${workingDay2.value}`)
  form.append('workingHours',workingHours.value)
  form.append('link',link.value)
  form.append('applyOnOwnWebsite',applyOnOwnWebsite.toString())

  if (edit){
    axios.put(`/api/job?id=${jobID}`,form,requestOptions)
    .then(response => {
      if (response.status === 200){
          dispatch(setMessage('Job is successfully saved'))
          setTimeout(() => {
              dispatch(setMessage(''))
          },2000)
          window.scrollTo(0, 0)
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
          dispatch(setMessage('Job is successfully saved'))
          setTimeout(() => {
              dispatch(setMessage(''))
          },2000)
          navigate(`/jobs`)
      }
  })
  
    .catch(error => {
        if (error.response.status === 400) setErrors(['Something went wrong'])
    })
  }

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
              <input id = 'jobTitle' key = {job.values?.title} defaultValue = {edit ? job.values?.title : ''} className = {!title.isValid ? 'inputError' : ''} onChange = {e => setTitle(prev => {return {...prev, value: e.target.value}})} onKeyUp = {capitalizeFirstCharacter} placeholder = 'Title...' autoComplete = 'on' required/>
              <label htmlFor = 'jobDescription' ><h3>Description (Characters remaining: {description.maxLength - description.currentLength}):</h3></label>
              <textarea id = 'jobDescription' key = {job.values?.description} defaultValue = {edit ? job.values?.description : ''} className = {!description.isValid ? 'inputError' : ''} onChange = {e => setDescription(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} onKeyUp = {capitalizeFirstCharacter} placeholder = 'Tell us about the job...' maxLength = {description.maxLength} style = {{height: '100px'}}/>

              <label htmlFor = 'jobIndustry'><h3>Industry:</h3></label>
              <select id = 'jobIndustry' key = 'jobIndustry' defaultValue = {edit ? job.values?.industry : ''} onChange = {e => setIndustry({value: e.target.value})} autoComplete = 'on'>
                  <option value = 'Any'>Any</option>
                  <option value = 'Beauty'>Beauty</option>
                  <option value = 'Construction'>Construction</option>
                  <option value = 'Information Technology'>Information Technology</option>
              </select>
              <label><h3>Roles of the job:</h3></label>
              <input className = {roles.alreadyExists || roles.isEmpty ? 'inputError' : ''}  onChange = {handleSetRole} value = {roles.currentVal} placeholder = 'E.g Managing files...' autoComplete = 'on' required/>
              <List name = 'Roles' 
              edit = {edit}
              state = {roles}
              values = {job.values?.roles}
              handleAdd = {() => setRoles(prev => ({...prev, value: [...prev.value, roles.currentVal]}))}
              handleClearInput = {() => setRoles(prev => {return {...prev,currentVal: ''}})}
              handleSetIsEmpty = {(empty = true) => setRoles(prev => {return{...prev,isEmpty: empty}})}
              handleSetAlreadyExists = {(exists = true) => setRoles(prev => {return {...prev,alreadyExists: exists}})}
              handleSetAll = {(newItems: Array<string>) => setRoles(prev => {return {...prev,value: newItems}})}
              />

              <label htmlFor = 'jobType'><h3>Type:</h3></label>
              <select id = 'jobType' key = 'jobType' defaultValue = {edit ? job.values?.type : ''} onChange = {e => setType({value: e.target.value})} style = {{width: '130px'}}> 
                <option value = 'Full=time'>Full-time</option>
                <option value = 'Part-time'>Part-time</option>
                <option value = 'Contract'>Contract</option>
              </select>
                  
                <br/>
                <br/>

               <hr className = 'mt-0-mb-4'/>
              <label><h3>Salary:</h3></label>

              <label htmlFor = 'jobCurrency'><h4>Currency:</h4></label>
              <select id = 'jobCurrency' key = 'jobCurrency' defaultValue = {edit ? job.values?.salary[0] : ''} style = {{width:'65px'}} onChange = {e => setCurrency({value: e.target.value})}>
                <option value = '&#36;'>&#36;</option>
                <option value = '&#163;'>&#163;</option>
                <option value = '&#165;'>&#165;</option>
                <option value = '&#x20B9;'>&#x20B9;</option>
                <option value = '&#8363;'>&#8363;</option>
              </select>

              <label><h4>From:</h4></label>
              <input placeholder = 'E.g 20000' key = {job.values?.salary.split('-')[0].substring(1).trim()} defaultValue = {edit ? job.values?.salary.split('-')[0].substring(1).trim()  : ''} onChange = {e => setSalary1(prev => {return {...prev, value: e.target.value}})} className = {!salary1.isValid ? 'inputError' : ''} autoComplete = 'on' required/>
              <label><h4>To (Optional):</h4></label>
              <input placeholder = 'E.g 30000' key = {job.values?.salary.split('-')[1].substring(2).trim()} defaultValue = {edit ? job.values?.salary.split('-')[1].substring(2).trim()  : ''} onChange = {e => setSalary2(prev => {return {...prev, value: e.target.value}})} className = {!salary2.isValid ? 'inputError' : ''} autoComplete = 'on'/>
              <br/>
              <br/>
              <hr className = 'mt-0-mb-4'/>
              <label htmlFor = 'jobPositions'><h3>Number of positions:</h3></label>
              <input type = 'number' className = {!positions.isValid ? 'inputError' : ''} id = 'jobPositions'  onChange = {e => setPositions(prev => {return {...prev, value: e.target.value}})} min = '1' key = 'jobPositions' defaultValue = {edit ? job.values?.positions : '1'} required style = {{width: '65px'}}/>

              <label><h3>Benefits (Optional):</h3></label>
              <input className = {benefits.alreadyExists || benefits.isEmpty ? 'inputError' : ''} onChange = {handleSetBenefit} value = {benefits.currentVal} placeholder = 'E.g Free parking...' autoComplete = 'on' required/>
              <List name = 'Benefits'
              edit = {edit}
              values = {job.values?.benefits}
              state = {benefits}
              handleAdd = {() => setBenefits(prev => ({...prev, value: [...prev.value, benefits.currentVal]}))}
              handleClearInput = {() => setBenefits(prev => {return {...prev,currentVal: ''}})}
              handleSetIsEmpty = {(empty = true) => setBenefits(prev => {return{...prev,isEmpty: empty}})}
              handleSetAlreadyExists = {(exists = true) => setBenefits(prev => {return {...prev,alreadyExists: exists}})}
              handleSetAll = {(newItems: Array<string>) => setBenefits(prev => {return {...prev,value: newItems}})}
              />

              <label htmlFor = 'jobRemote'><h3>Remote:</h3></label>
              <select id = 'jobRemote' key = 'remote' defaultValue = {job.values?.remote ? 'Yes' : 'No'} style = {{width:'80px'}} onChange = {e => e.target.value === 'Yes' ? setIsRemote(true) : setIsRemote(false)}>
                  <option value = 'Yes'>Yes</option>
                  <option value = 'No'>No</option>
              </select>

              <label htmlFor = 'jobTraining'><h3>Training Provided:</h3></label>
              <select id = 'jobTraining' key = 'training' defaultValue = {job.values?.training ? 'Yes' : 'No'} style = {{width:'80px'}} onChange = {e => e.target.value === 'Yes' ? setIsTrainingProvided(true) : setIsTrainingProvided(false)}>
                  <option value = 'Yes'>Yes</option>
                  <option value = 'No'>No</option>
              </select>

            </div>

            <div className = {`tab ${currentTab === 2 ? 'show' : 'hide'}`}>
                <h1 className = 'title'>Requirements</h1> 
                <hr className = 'mt-0-mb-4'/>

                <label htmlFor = 'skills'><h3>Skills required (Optional):</h3></label>
                <input id = 'skills' className = {skills.alreadyExists || skills.isEmpty ? 'inputError' : ''} value = {skills.currentVal} onChange = {handleSetSkills} placeholder = 'E.g Good problem solving...' autoComplete = 'on'/>

                <List name = 'Skills' 
                edit = {edit}
                values = {edit ? job.values?.skills : [{name: ''}]}
                state = {skills}
                handleAdd = {() => setSkills(prev => ({...prev, value: [...prev.value, skills.currentVal]}))}
                handleClearInput = {() => setSkills(prev => {return {...prev,currentVal: ''}})}
                handleSetIsEmpty = {(empty = true) => setSkills(prev => {return{...prev,isEmpty: empty}})}
                handleSetAlreadyExists = {(exists = true) => setSkills(prev => {return {...prev,alreadyExists: exists}})}
                handleSetAll = {(newItems: Array<string>) => setSkills(prev => {return {...prev,value: newItems}})}
                />

                <label><h3>Working days:</h3></label>

                  <select id = 'workingDay1' key = 'WorkingDay1' defaultValue = {edit ? job.values?.workingDays.split('-')[0].trim() : 'Monday'} onChange  = {e => setWorkingDay1(prev => {return{...prev, value: e.target.value}})} style = {{width:'auto'}}>
                    <option value = 'Monday'>Monday</option>
                    <option value = 'Tuesday'>Tuesday</option>
                    <option value = 'Wednesday'>Wednesday</option>
                    <option value = 'Thursday'>Thursday</option>
                    <option value = 'Friday'>Friday</option>
                    <option value = 'Saturday'>Saturday</option>
                    <option value = 'Sunday'>Sunday</option>
                  </select>
                  
                  <span style = {{marginLeft:'10px',marginRight:'10px'}}>to</span>

                  <select id = 'workingDay2' key = 'WorkingDay2' defaultValue = {edit ? job.values?.workingDays.split('-')[1].trim() : 'Friday'} onChange  = {e => setWorkingDay2(prev => {return{...prev, value: e.target.value}})} style = {{width:'auto'}}>
                    <option value = 'Monday'>Monday</option>
                    <option value = 'Tuesday'>Tuesday</option>
                    <option value = 'Wednesday'>Wednesday</option>
                    <option value = 'Thursday'>Thursday</option>
                    <option value = 'Friday'>Friday</option>
                    <option value = 'Saturday'>Saturday</option>
                    <option value = 'Sunday'>Sunday</option>
                  </select>

                <label htmlFor = 'workingHours'><h3>Working hours:</h3></label>
                <input type = 'number' className = {!workingHours.isValid ? 'inputError' : ''} key = 'workingHours1' defaultValue = {job.values?.workingHours} id = 'jobPositions'  onChange = {e => setWorkingHours(prev => {return {...prev, value: e.target.value}})} min = '1' max = '12'  required style = {{width: '65px'}}/>

                <label htmlFor = 'startDate'><h3>Expected start date:</h3></label>
                <input type = 'date' className = {!startDate.isValid ? 'inputError' : ''} key = 'workingHours2' defaultValue = {job.values?.startDate} id = 'startDate' min = {getcurrentDate()} onChange = {e => setStartDate(prev => {return {...prev, value: e.target.value}})} required/>
              
                <label htmlFor = 'jobEducation'><h3>Education:</h3></label>
                    <select id = 'jobEducation' key = 'education' defaultValue = {job.values?.education} onChange = {e => setEducation({value: e.target.value})} required>
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
                <select id = 'applicationPreference' key = 'applyOnOwnWebsite' defaultValue = {job.values?.applyOnOwnWebsite ? 'Yes' : 'No'} style = {{width: '80px'}} onChange = {e => e.target.value === 'No' ? setApplyOnOwnWebsite(true) : setApplyOnOwnWebsite(false)}>
                  <option value = 'Yes'>Yes</option>
                  <option value = 'No'>No</option>
                </select>

                {applyOnOwnWebsite ? 
                  <div>
                    <label htmlFor = 'jobLink'><h3>Job link:</h3></label>
                    <input id = 'jobLink' key = 'jobLink' defaultValue = {edit ? job.values?.link : ''} className = {!link.isValid ? 'inputError' : ''} type = 'url' placeholder = 'Job link...' onChange = {e => setLink(prev => {return {...prev, value: e.target.value}})}/>
                  </div>
                : null}

            </div>

            {currentTab === maxTabs ? <button type = 'button' id = 'submit' onClick = {handleSubmitForm}>Submit</button> : <button type = 'button' className = 'toggleTabBtn' onClick = {validateForm} style = {{float:'right'}}>Next</button>}
            <button type = 'button' className = {currentTab > 1 ? 'toggleTabBtn' : 'hide'} onClick = {handleToPrevTab}>Previous</button>
        </form>

    </div>
  )
}
