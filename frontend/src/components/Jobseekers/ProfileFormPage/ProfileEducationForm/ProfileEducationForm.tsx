import axios from 'axios'
import React,{useState, useEffect} from 'react'
import { ProfileEducationProps } from '../../../../features/Jobseekers/profiles/types/profileEducationProps'
import { useAppDispatch } from '../../../../app/hooks'
import { addProfileEducation, editProfileEducation } from '../../../../features/Jobseekers/profiles/profileEducation'
import { token } from '../../../../features/Auth/user'
import Errors from '../../../Global/messages/Errors'
import './css/ProfileEducationForm.css'

export const initialEducation = {
    id: 0,
    education: '',
    field: '',
    institution: '',
    country: '',
    city: '',
    currentlyEnrolled: false,
    fromDate: '',
    toDate: ''
}

export default function ProfileEducationForm({edit = true, chosenEducation, popupOff}: {edit?: boolean, chosenEducation?: ProfileEducationProps, popupOff: () => void}) {
    const dispatch = useAppDispatch()
    const [education, setEducation] = useState({value: chosenEducation?.education || 'No formal education'})
    const [field, setField] = useState({value: chosenEducation?.field || '', isEmptyErrMsg: 'Field of study is required'})
    const [institution, setInstitution] = useState({value: chosenEducation?.institution || ''})
    const [country, setCountry] = useState({value: chosenEducation?.country || ''})
    const [city, setCity] = useState({value: chosenEducation?.city || ''})
    const [currentlyEnrolled, setCurrentlyEnrolled] = useState(chosenEducation?.currentlyEnrolled || false)
    const [date, setDate] = useState({from: {month: chosenEducation?.fromDate.split(' ')[0] || '', year: chosenEducation?.fromDate.split(' ')[1] || ''}, to: {month: chosenEducation?.toDate.split(' ')[0] || '', year: chosenEducation?.toDate.split(' ')[1] || ''}, errorMsg: 'Date is invalid'})
    const [errors, setErrors] = useState<Array<string>>([])

    useEffect(() => {
      if (date.to.month !== '' || date.to.year !== '') setCurrentlyEnrolled(false)
    },[date.to])

    const validateForm = () => {
      let isValid = true
      let errors: Array<string> = []

      if (field.value === ''){
        document.getElementById('fieldOfStudy')!.className = 'inputError'
        errors.push(field.isEmptyErrMsg)
        isValid = false
      }

      if (!currentlyEnrolled){
        if ((date.from.month !== '' || date.from.year !== '') && (date.to.month === '' || date.to.year === '')){
          document.getElementById('toInstitutionMonth')!.className = 'inputError'
          document.getElementById('toInstitutionYear')!.className = 'inputError'
          errors.push(date.errorMsg)
          isValid = false
        }
      }

      if (!isValid) {
        setErrors(errors)
        document.getElementById('educationForm')!.scrollIntoView({behavior: 'smooth'})
        return
      }

      setErrors([])
      return isValid
    }
    

    function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault()
        if (!validateForm()) return

        const requestOptions = {
           headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
         }

       let form = new FormData()
       form.append('education', education.value)
       form.append('field', field.value)
       form.append('institution', institution.value)
       form.append('country', country.value)
       form.append('city', city.value)
       form.append('currentlyEnrolled', String(currentlyEnrolled))
       form.append('fromDate', `${date.from.month} ${date.from.year}`)
       form.append('toDate', `${date.to.month} ${date.to.year}`)

       axios.post(`/api/profile/education?id=${chosenEducation?.id || 0}`,form, requestOptions)
       .then(response => {
        if (response.status === 201){
            const data = response.data.education
            if (!edit) dispatch(addProfileEducation(data))
            else dispatch(editProfileEducation(data))
            popupOff()
         }
       })

       .catch(err => {
         console.log(err)
       })
    }

  return (
    <form  id = 'educationForm' onSubmit = {handleSubmit}>
        <h1 className = 'title'>Education</h1> 
        <Errors errors = {errors}/>
        <label htmlFor = 'education'><h4>Type of education:</h4></label>
        <select id = 'education' onChange = {e => setEducation({value: e.target.value})} value = {education.value} required>
            <option value = 'No formal education'>No formal education</option>
            <option value = 'Secondary education'>Secondary education or high school</option>
            <option value = 'GED'>GED</option>
            <option value = 'Vocational qualification'>Vocational qualification</option>
            <option value = 'A-Levels'>A-Levels</option>
            <option value = "Bachelor's degree">Bachelor's degree</option>
            <option value = "Master's degree">Master's degree</option>
            <option value = 'Doctorate or higher'>Doctorate or higher</option>
        </select>

        <label htmlFor = 'fieldOfStudy'><h4>Field of study:</h4></label>
        <input type = 'text' id = 'fieldOfStudy' onChange = {e => setField(prev => {return{...prev, value: e.target.value}})} value = {field.value} placeholder = 'Field of study...'/>

        <label htmlFor = 'institution'><h4>Institution (E.g College / University): </h4></label>
        <input type = 'text' id = 'institution' onChange = {e => setInstitution(prev => {return{...prev, value: e.target.value}})} value = {institution.value} placeholder = 'Your institution...'/>

        <label htmlFor = 'educationCountry'><h4>Country:</h4></label>
        <input type = 'text' id = 'educationCountry' onChange = {e => setCountry(prev => {return{...prev, value: e.target.value}})} value = {country.value} placeholder = 'Country...'/>

        <label htmlFor = 'educationCity'><h4>City:</h4></label>
        <input type = 'text' id = 'educationCity' onChange = {e => setCity(prev => {return{...prev, value: e.target.value}})} value = {city.value} placeholder = 'City...'/>

        <label htmlFor = 'fromInstitutionMonth'><h4>From:</h4></label>

        <section className = 'row' style = {{gap: '10px'}}>
          <select id = 'fromInstitutionMonth' value = {date.from.month} onChange = {e => setDate(prev => ({...prev, from: {...prev.from, month: e.target.value}}))}>
            <option value = ''>Month:</option>
            <option value = 'January'>January</option>
            <option value = 'February'>February</option>
          </select>

          <select id = 'fromInstitutionYear' value = {date.from.year} onChange = {e => setDate(prev => ({...prev, from: {...prev.from, year: e.target.value}}))}>
            <option value = ''>Year:</option>
            <option value = '1900'>1900</option>
          </select>
        </section>

        <label htmlFor = 'toInstitutionMonth'><h4>To:</h4></label>

        <section className = 'row' style = {{gap: '10px'}}>
           <select id = 'toInstitutionMonth' value = {date.to.month} onChange = {e => setDate(prev => ({...prev, to: {...prev.to, month: e.target.value}}))}>
              <option value = ''>Month:</option>
              <option value = 'January'>January</option>
              <option value = 'February'>February</option>
            </select>

            <select id = 'toInstitutionYear' value = {date.to.year} onChange = {e => setDate(prev => ({...prev, to: {...prev.to, year: e.target.value}}))}>
              <option value = ''>Year:</option>
              <option value = '1900'>1900</option>
            </select>
        </section>

        <section className = 'row'>
          <label htmlFor = 'currentlyEnrolled'><h4>Currently Enrolled:</h4></label>
          <input type = 'checkbox' checked = {currentlyEnrolled} onChange = {e => setCurrentlyEnrolled(e.target.checked)} />
        </section>

        <div className = 'row' style = {{justifyContent: 'space-between'}}>
          <button type = 'submit'>Submit</button> 
          <button type = 'button' onClick = {popupOff}>Cancel</button>
        </div>
      
    </form>
  )
}
