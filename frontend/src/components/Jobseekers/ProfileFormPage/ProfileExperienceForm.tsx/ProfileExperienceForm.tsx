import axios from 'axios';
import React, {useState} from 'react'
import {useParams} from 'react-router-dom';
import Errors from '../../../Global/messages/Errors'
import {useAppSelector, useAppDispatch} from '../../../Global/features/hooks';
import {fetchProfileExperience} from '../../../Global/features/Jobseekers/profiles/profileExperience';
import {token} from '../../../Global/features/Auth/user';

export default function ProfileExperienceForm({edit = true, popupOff}: {edit: boolean, popupOff: () => void}) {
    const [experience,setExperience] = useState({value: [{title: '', companyName: '',  EmployerName: '', EmployerEmail: '', EmployerPhone: '', description: '', years: 1, isOnGoing: false}], popup: false, currentVal: {title: '', companyName: '', EmployerName: '', EmployerEmail: '', EmployerPhone: '', description: '', years: 1, isOnGoing: false}, isValid: true, currentErrorMsg: '', alreadyExistsMsg: 'Experience already exists'})
    const [errors,setErrors] = useState<Array<string>>([])
    const dispatch = useAppDispatch()
    const {userID} = useParams()

      function handleAddExperience(){
        const requestOptions = {
          headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
        }

      let form = new FormData()
      form.append('title', experience.currentVal.title)
      form.append('companyName', experience.currentVal.companyName)
      if (experience.currentVal.EmployerName) form.append('EmployerName', experience.currentVal.EmployerName)
      if (experience.currentVal.EmployerEmail) form.append('EmployerEmail', experience.currentVal.EmployerEmail)
      if (experience.currentVal.EmployerPhone) form.append('EmployerPhone', experience.currentVal.EmployerPhone)
      form.append('description', experience.currentVal.description)
      form.append('years', experience.currentVal.years.toString())
      form.append('isOnGoing', experience.currentVal.isOnGoing.toString())
      
      axios.post('/api/profileExperience',form, requestOptions)
      .then(response => {
        if (response.status === 201){
          popupOff()
          dispatch(fetchProfileExperience(Number(userID)))
          setExperience(prev => {return{...prev, isValid: true, popup: false, currentVal: {title: '', companyName: '', EmployerName: '', EmployerEmail: '', EmployerPhone: '', description: '', years: 1, isOnGoing: false}}})
          setErrors([])
        }
      })
        
    }

    function handleRemoveExperience(idx: number){
        const newExperience = [...experience.value]
        newExperience.splice(idx, 1)
        setExperience(prev => {return{...prev, value: newExperience}})
    } 

  return (
    <div>
    <h2>Add Experience:</h2>
    <p className = 'error'>{!experience.isValid ? <li>{experience.currentErrorMsg}</li> : null}</p>

    <label htmlFor = 'experienceTitle'><h4>Job title:</h4></label>
    <input id = 'experienceTitle' className = {!experience.isValid ? 'inputError' : ''} onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, title: e.target.value}}))} value = {experience.currentVal.title} placeholder = 'E.g Software Engineer...' maxLength = {200} autoComplete = 'on'/>

    <label htmlFor = 'experienceCompanyName'><h4>Company name:</h4></label>
    <input id = 'experienceCompanyName' placeholder = 'Company name...' value = {experience.currentVal.companyName} onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, companyName: e.target.value}}))}/>

    <label htmlFor = 'profileExperienceDescription'><h4>Description:</h4></label>
    <textarea id = 'profileExperienceDescription' value = {experience.currentVal.description} className = {!experience.isValid ? 'inputError' : ''}  onChange = {e => {setExperience(prev => ({...prev, currentVal: {...prev.currentVal, description: e.target.value}})); e.target.value = e.target.value.replace(',','')}}  placeholder = 'E.g Developing mobile apps...' autoComplete = 'on'/>

    <label htmlFor = 'profileExperienceYears'><h4>Number of years:</h4></label>
    <input type = 'number' id = 'profileExperienceYears' value = {experience.currentVal.years} onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, years: Number(e.target.value)}}))}  min = '0' max = '10' autoComplete = 'on'/>

    <div style = {{display: 'flex', alignItems: 'center'}}>
        <label htmlFor = 'profileOnGoingExperience'><h4>Still doing this job:</h4></label>
        <input type = 'checkbox' id = 'profileOnGoingExperience' checked = {experience.currentVal.isOnGoing} onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, isOnGoing: e.target.checked}}))} autoComplete = 'on'/>
    </div>
    
    <label><h3>Reference<span style = {{color: 'gray'}}> (Optional but recommended)</span></h3></label>
    <hr className = 'mt-0-mb-4'/>
    <label htmlFor = 'experienceEmployerName'><h4>Employer's name:</h4></label>
    <input id = 'experienceEmployerName' className = {!experience.isValid ? 'inputError' : ''} placeholder = 'Employer name...' onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, EmployerName: e.target.value}}))} value = {experience.currentVal.EmployerName} maxLength = {200} autoComplete = 'on'/>
    
    <label htmlFor = 'experienceEmployerEmail'><h4>Employer's email:</h4></label>
    <input id = 'experienceEmployerEmail' placeholder = 'Employer email...' onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, EmployerEmail: e.target.value}}))}  value = {experience.currentVal.EmployerEmail} autoComplete = 'on'/>

    <label htmlFor = 'experienceEmployerPhone'><h4>Employer's phone:</h4></label>
    <input type = 'tel' id = 'experienceEmployerPhone' placeholder = 'Employer phone...' onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, EmployerPhone: e.target.value}}))}  value = {experience.currentVal.EmployerPhone} maxLength = {15} autoComplete = 'on'/>

    <div style = {{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
        <button type = 'button' onClick = {handleAddExperience}>Submit</button>
        <button onClick = {() => popupOff()}>Cancel</button>
    </div>

    </div>
  )
}
