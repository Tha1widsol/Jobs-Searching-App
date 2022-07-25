import React, {useState} from 'react'
import ReactScrollableFeed from 'react-scrollable-feed';
import Errors from '../../../Global/messages/Errors'

export default function ProfileExperienceForm({edit = true, popupOff}: {edit: boolean, popupOff: () => void}) {
    const [experience,setExperience] = useState({value: [{title: '', companyName: '',  EmployerName: '', EmployerEmail: '', EmployerPhone: '', description: '', years: 1, isOnGoing: false}], popup: false, currentVal: {title: '', companyName: '', EmployerName: '', EmployerEmail: '', EmployerPhone: '', description: '', years: 1, isOnGoing: false}, isValid: true, currentErrorMsg: '', alreadyExistsMsg: 'Experience already exists'})
    const [errors,setErrors] = useState<Array<string>>([])

    function handleSetExperience(e: React.ChangeEvent<HTMLTextAreaElement>){
        setExperience(prev => ({
          ...prev,
          currentVal: {...prev.currentVal, description: e.target.value}
        }))
        e.target.value = e.target.value.replace(',','')
      }

      function handleAddExperience(){
        if (!experience.currentVal.description || !experience.currentVal.title || !experience.currentVal.EmployerName) {
            setExperience(prev => {return{...prev, isValid: false, currentErrorMsg: 'Fields are required'}})
            return
        }
        
        if (experience.value.find(exp => exp.description === experience.currentVal.description && exp.title === experience.currentVal.title && exp.EmployerName === experience.currentVal.EmployerName)) {
            setExperience(prev => {return{...prev, isValid: false, currentErrorMsg: experience.alreadyExistsMsg}})
            return
        }
        setExperience(prev => ({
            ...prev,
            value: [...prev.value, {
                title: experience.currentVal.title,
                companyName: experience.currentVal.companyName,
                EmployerName: experience.currentVal.EmployerName,
                EmployerEmail: experience.currentVal.EmployerEmail,
                EmployerPhone: experience.currentVal.EmployerPhone,
                description: experience.currentVal.description, 
                years: experience.currentVal.years || 1, 
                isOnGoing: experience.currentVal.isOnGoing}]
          }))
        
          setExperience(prev => {return{...prev, isValid: true, popup: false, currentVal: {title: '', companyName: '', EmployerName: '', EmployerEmail: '', EmployerPhone: '', description: '', years: 1, isOnGoing: false}}})
          setErrors([])
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

    <label htmlFor = 'profileExperience'><h4>Description:</h4></label>
    <textarea id = 'profileExperience' value = {experience.currentVal.description} className = {!experience.isValid ? 'inputError' : ''}  onChange = {handleSetExperience} placeholder = 'E.g Developing mobile apps...' autoComplete = 'on'/>

    <label htmlFor = 'profileExperienceYears'><h4>Number of years:</h4></label>
    <input type = 'number' id = 'profileExperienceYears' value = {experience.currentVal.years} onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, years: Number(e.target.value)}}))}  min = '0' max = '10' autoComplete = 'on'/>

    <div style = {{display: 'flex', alignItems: 'center'}}>
        <label htmlFor = 'profileOnGoingExperience'><h4>Still doing this job:</h4></label>
        <input type = 'checkbox' id = 'profileOnGoingExperience' checked = {experience.currentVal.isOnGoing} onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, isOnGoing: e.target.checked}}))} autoComplete = 'on'/>
    </div>
    
    <label><h3>Reference</h3></label>
    <hr className = 'mt-0-mb-4'/>
    <label htmlFor = 'experienceCompanyName'><h4>Employer's name:</h4></label>
    <input id = 'experienceCompanyName' className = {!experience.isValid ? 'inputError' : ''} placeholder = 'Employer name...' onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, EmployerName: e.target.value}}))} value = {experience.currentVal.EmployerName} maxLength = {200} autoComplete = 'on'/>
    
    <label htmlFor = 'experienceCompanyEmail'><h4>Employer's email (Optional):</h4></label>
    <input id = 'experienceCompanyEmail' placeholder = 'Employer email...' onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, EmployerEmail: e.target.value}}))}  value = {experience.currentVal.EmployerEmail} autoComplete = 'on'/>

    <label htmlFor = 'experienceCompanyPhone'><h4>Employer's phone (Optional):</h4></label>
    <input type = 'tel' id = 'experienceCompanyPhone' placeholder = 'Employer phone...' onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, EmployerPhone: e.target.value}}))}  value = {experience.currentVal.EmployerPhone} maxLength = {15} autoComplete = 'on'/>

    <div style = {{marginTop: '15px'}}>
        <button type = 'button' onClick = {handleAddExperience}>Submit</button>
        <button onClick = {() => popupOff()}>Cancel</button>
    </div>

    </div>
  )
}
