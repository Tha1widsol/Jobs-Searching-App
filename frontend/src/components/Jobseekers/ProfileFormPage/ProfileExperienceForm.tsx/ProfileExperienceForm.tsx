import axios from 'axios';
import React, {useState} from 'react'
import { useParams } from 'react-router-dom';
import Errors from '../../../Global/messages/Errors'
import {useAppSelector, useAppDispatch} from '../../../Global/features/hooks';
import {token} from '../../../Global/features/Auth/user';
import {ProfileExperienceProps} from './types/ProfileExperienceProps';
import {AddProfileExperience, fetchProfileExperience} from '../../../Global/features/Jobseekers/profiles/profileExperience';

export const initialExperience = {
 id: 0, title: '', companyName: '',  EmployerName: '', EmployerEmail: '', EmployerPhone: '', description: '', years: 1, isOnGoing: false
}

export default function ProfileExperienceForm({edit = true, popupOff, chosenExperience}: {edit: boolean, popupOff: () => void, chosenExperience?: ProfileExperienceProps}) {
    const dispatch = useAppDispatch()
    const {userID} = useParams()
    const [experience,setExperience] = useState({value: chosenExperience || initialExperience, popup: false, isValid: true, invalidMsg: 'Fields are required', alreadyExistsMsg: 'Experience already exists'})
    const currentExperience = useAppSelector(state => state.profileExperience.values)
    const [errors,setErrors] = useState<Array<string>>([])

    const validateForm = () => {
      let isValid = true

      if (!edit){
        if (!experience.value.description || !experience.value.title || !experience.value.EmployerName) {
          setExperience(prev => {return{...prev, isValid: false}})
          setErrors(prev => {return[...prev, experience.invalidMsg]})
          isValid = false
        }
      
        if (currentExperience.find(exp => exp.description === experience.value.description && exp.title === experience.value.title && exp.EmployerName === experience.value.EmployerName)) {
          setErrors(prev => {return[...prev, experience.alreadyExistsMsg]})
          isValid = false
        }
      }

      return isValid
    }

    function handleAddExperience(e: React.SyntheticEvent){
      e.preventDefault()

      if (!validateForm()) return
        const requestOptions = {
          headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
        }

      let form = new FormData()
      form.append('title', experience.value.title)
      form.append('companyName', experience.value.companyName)
      if (experience.value.EmployerName) form.append('EmployerName', experience.value.EmployerName)
      if (experience.value.EmployerEmail) form.append('EmployerEmail', experience.value.EmployerEmail)
      if (experience.value.EmployerPhone) form.append('EmployerPhone', experience.value.EmployerPhone)
      form.append('description', experience.value.description)
      form.append('years', experience.value.years.toString() || '0')
      form.append('isOnGoing', experience.value.isOnGoing?.toString() || 'False')

      if (chosenExperience?.title){
        axios.put(`/api/profileExperience?id=${chosenExperience.id}`,form, requestOptions)
        .then(response => {
          if (response.status === 200){
              popupOff()
              dispatch(fetchProfileExperience(Number(userID)))
              setExperience(prev => {return{...prev, isValid: true, popup: false, value: initialExperience}})
              setErrors([])
          }
        })
       }
      
      else {
        axios.post('/api/profileExperience',form, requestOptions)
        .then(response => {
          if (response.status === 201){
              popupOff()
              dispatch(AddProfileExperience({
              id: experience.value.id,
              title: experience.value.title,
              companyName: experience.value.companyName,
              EmployerName: experience.value.EmployerName,
              EmployerEmail: experience.value.EmployerEmail,
              EmployerPhone: experience.value.EmployerPhone,
              description: experience.value.description,
              years: experience.value.years,
              isOnGoing: experience.value.isOnGoing
        }))
            setExperience(prev => {return{...prev, isValid: true, popup: false, value: initialExperience}})
            setErrors([])
          }
        })
      }
    }

    function handleRemoveExperience(idx: number){
        const newExperience = [...currentExperience]
        newExperience.splice(idx, 1)
        dispatch(AddProfileExperience(newExperience))
    } 

  return (
    <div>
    <h2>Add Experience:</h2>
    <Errors errors = {errors}/>

    <label htmlFor = 'experienceTitle'><h4>Job title:</h4></label>
    <input id = 'experienceTitle' className = {!experience.isValid ? 'inputError' : ''} onChange = {e => setExperience(prev => ({...prev, value: {...prev.value, title: e.target.value}}))} value = {experience.value.title} placeholder = 'E.g Software Engineer...' maxLength = {200} autoComplete = 'on'/>

    <label htmlFor = 'experienceCompanyName'><h4>Company name:</h4></label>
    <input id = 'experienceCompanyName' placeholder = 'Company name...' value = {experience.value.companyName} onChange = {e => setExperience(prev => ({...prev, value: {...prev.value, companyName: e.target.value}}))}/>

    <label htmlFor = 'profileExperienceDescription'><h4>Description:</h4></label>
    <textarea id = 'profileExperienceDescription' value = {experience.value.description} className = {!experience.isValid ? 'inputError' : ''}  onChange = {e => {setExperience(prev => ({...prev, value: {...prev.value, description: e.target.value}})); e.target.value = e.target.value.replace(',','')}}  placeholder = 'E.g Developing mobile apps...' autoComplete = 'on'/>

    <label htmlFor = 'profileExperienceYears'><h4>Number of years:</h4></label>
    <input type = 'number' id = 'profileExperienceYears' value = {experience.value.years} onChange = {e => setExperience(prev => ({...prev, value: {...prev.value, years: Number(e.target.value)}}))}  min = '0' max = '10' autoComplete = 'on'/>

    <div style = {{display: 'flex', alignItems: 'center'}}>
        <label htmlFor = 'profileOnGoingExperience'><h4>Still doing this job:</h4></label>
        <input type = 'checkbox' id = 'profileOnGoingExperience' checked = {experience.value.isOnGoing} onChange = {e => setExperience(prev => ({...prev, value: {...prev.value, isOnGoing: e.target.checked}}))} autoComplete = 'on'/>
    </div>
    
    <label><h3>Reference<span style = {{color: 'gray'}}> (Optional but recommended)</span></h3></label>
    <hr className = 'mt-0-mb-4'/>
    <label htmlFor = 'experienceEmployerName'><h4>Employer's name:</h4></label>
    <input id = 'experienceEmployerName' className = {!experience.isValid ? 'inputError' : ''} placeholder = "Employer's name..." onChange = {e => setExperience(prev => ({...prev, value: {...prev.value, EmployerName: e.target.value}}))} value = {experience.value.EmployerName} maxLength = {200} autoComplete = 'on'/>
    
    <label htmlFor = 'experienceEmployerEmail'><h4>Employer's email:</h4></label>
    <input id = 'experienceEmployerEmail' placeholder = "Employer's email..." onChange = {e => setExperience(prev => ({...prev, value: {...prev.value, EmployerEmail: e.target.value}}))}  value = {experience.value.EmployerEmail} autoComplete = 'on'/>

    <label htmlFor = 'experienceEmployerPhone'><h4>Employer's phone:</h4></label>
    <input type = 'tel' id = 'experienceEmployerPhone' placeholder = "Employer's phone..." onChange = {e => setExperience(prev => ({...prev, value: {...prev.value, EmployerPhone: e.target.value}}))}  value = {experience.value.EmployerPhone} maxLength = {15} autoComplete = 'on'/>

    <div style = {{display: 'flex', justifyContent: 'space-between', marginTop: '15px'}}>
        <button type = 'button' onClick = {handleAddExperience}>Submit</button>
        <button onClick = {() => popupOff()}>Cancel</button>
    </div>

    </div>
  )
}
