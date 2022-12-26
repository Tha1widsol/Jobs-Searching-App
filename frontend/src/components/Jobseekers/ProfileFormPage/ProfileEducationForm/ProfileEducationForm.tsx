import React,{useState} from 'react'
import Errors from '../../../Global/messages/Errors'
import './css/ProfileEducationForm.css'

export default function ProfileEducationForm({edit = false, popupOff}: {edit?: boolean, popupOff: () => void}) {
    const [education, setEducation] = useState({value: 'No formal education'})
    const [field, setField] = useState({value: '', isEmptyErrMsg: 'Field of study is required'})
    const [institution, setInstitution] = useState({value: ''})
    const [country, setCountry] = useState({value: ''})
    const [city, setCity] = useState({value: ''})
    const [currentlyEnrolled, setCurrentlyEnrolled] = useState(false)
    const [date, setDate] = useState({from: {month: '', year: ''}, to: {month: '', year: ''}})
    const [errors, setErrors] = useState<Array<string>>([])
    

    function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault()
  
        let isValid = true
        let errors: Array<string> = []
     
        if (field.value === ''){
          console.log('fs')
          document.getElementById('fieldOfStudy')!.className = 'inputError'
          errors.push(field.isEmptyErrMsg)
          isValid = false
        }

        if (!isValid) {
          setErrors(errors)
          document.getElementById('educationForm')!.scrollIntoView({behavior: 'smooth'})
          return
        }

        setErrors([])
        return isValid
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
