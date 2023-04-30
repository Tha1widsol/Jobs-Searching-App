import axios from 'axios';
import React,{useState, useEffect} from 'react'
import Errors from '../../Global/messages/Errors';
import { useParams } from 'react-router-dom';
import { useAppSelector,useAppDispatch } from '../../../app/hooks';
import { token } from '../../../features/Auth/user';
import { addJobExperience, editJobExperience, deleteJobExperience } from '../../../features/Employers/jobs/jobExperience';
import { JobExperienceProps } from '../../../features/Employers/jobs/types/JobExperienceProps';
import { fetchJobExperience } from '../../../features/Employers/jobs/jobExperience';

export const initialExperience = {
 id: 0, experience: '', years: '',  required: false
}

export default function JobExperienceForm({edit = true, isIsolated = true, popupOff, chosenExperience}: {edit?: boolean, isIsolated?: boolean, popupOff: () => void, chosenExperience?: JobExperienceProps}) {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const [experience,setExperience] = useState({value: chosenExperience || initialExperience, popup: false, isValid: true, invalidMsg: 'Fields are required', alreadyExistsMsg: 'Experience already exists'})
    const currentExperience = useAppSelector(state => state.jobExperience.values)
    const [errors, setErrors] = useState<Array<string>>([])
    const {jobID}  = useParams()
    
    useEffect(() => {
      dispatch(fetchJobExperience(user.values?.id))
    },[dispatch, user.values?.id])

    const validateForm = () => {
      let isValid = true
      if (edit) return isValid
     
      if (!experience.value.experience) {
        setExperience(prev => {return{...prev, isValid: false}})
        setErrors(prev => {return[...prev, experience.invalidMsg]})
        isValid = false
      }
    
      if (currentExperience.find(exp => exp.experience === experience.value.experience)) {
        setErrors(prev => {return[...prev, experience.alreadyExistsMsg]})
        isValid = false
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
      form.append('experience', experience.value.experience)
      form.append('years', experience.value.years.toString() || '0')
      form.append('required', experience.value.required?.toString())

        axios.post(`/api/job/experience?id=${jobID}`,form, requestOptions)
        .then(response => {
          if (response.status === 200){
              const data = response.data.experience
              popupOff()
              if (!edit) dispatch(addJobExperience(data))
              else dispatch(editJobExperience(data))
              setExperience(prev => {return{...prev, isValid: true, popup: false, value: initialExperience}})
              setErrors([])
          }
        })
       

    }

  return (
    <form onSubmit = {handleAddExperience}>
      <h2>{edit ? 'Edit Experience:' : 'Add Experience:'}</h2>
        <p className = 'error'>{!experience.isValid ? <li>{experience.invalidMsg}</li> : null}</p>

        <label><h4>Description:</h4></label>
        <textarea id = 'experienceDescription'  onChange = {e => {setExperience(prev => ({...prev, value: {...prev.value, experience: e.target.value}})); e.target.value = e.target.value.replace(',','')}} value = {experience.value.experience} className = {!experience.isValid ? 'inputError' : ''}  placeholder = 'E.g Developing mobile apps...' autoComplete = 'on'/>

        <label><h4>Number of years:</h4></label>
        <input type = 'number' value = {experience.value.years} onChange = {e => setExperience(prev => ({...prev, value: {...prev.value, years: e.target.value}}))} id = 'experienceYears' min = '0' max = '10' autoComplete = 'on'/>

        <div style = {{display: 'flex', alignItems: 'center'}}>
        <label><h4>Required:</h4></label>
        <input type = 'checkbox' id = 'experienceRequired' defaultValue = 'No'  checked = {experience.value.required} onChange = {e => setExperience(prev => ({...prev, value: {...prev.value, required: e.target.checked}}))}/>
        </div>
        
        <button>Submit</button>
        <button onClick = {() => setExperience(prev => {return{...prev, popup: false}})} type = 'button'>Cancel</button>
    </form>
  )
}
