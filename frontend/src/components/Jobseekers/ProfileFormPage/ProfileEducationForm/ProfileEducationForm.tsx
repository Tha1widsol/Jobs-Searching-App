import React,{useState} from 'react'
import './css/ProfileEducationForm.css'

export default function ProfileEducationForm({isIsolated = true}: {isIsolated?: boolean}) {
    const [education, setEducation] = useState({value: 'No formal education'})
    const [field, setField] = useState({value: ''})
    const [institution, setInstitution] = useState({value: ''})
    const [country, setCountry] = useState({value: ''})
    const [city, setCity] = useState({value: ''})
    const [currentlyEnrolled, setCurrentlyEnrolled] = useState(false)
    const [date, setDate] = useState({from: {month: '', year: ''}, to: {month: '', year: ''}})

    function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault()
        return
    }

  return (
    <div>
        <h1 className = 'title'>Education</h1> 
        <label htmlFor = 'education'><h3>Highest level of education:</h3></label>
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

        <label htmlFor = 'fieldOfStudy'><h3>Field of study:</h3></label>
        <input type = 'text' id = 'fieldOfStudy' onChange = {e => setField(prev => {return{...prev, value: e.target.value}})} value = {field.value} placeholder = 'Field of study...'/>

        <label htmlFor = 'institution'><h3>Institution (E.g College / University): </h3></label>
        <input type = 'text' id = 'institution' onChange = {e => setInstitution(prev => {return{...prev, value: e.target.value}})} value = {institution.value} placeholder = 'Your institution...'/>

        <label htmlFor = 'educationCountry'><h3>Country:</h3></label>
        <input type = 'text' id = 'educationCountry' onChange = {e => setCountry(prev => {return{...prev, value: e.target.value}})} value = {country.value} placeholder = 'Country...'/>

        <label htmlFor = 'educationCity'><h3>City:</h3></label>
        <input type = 'text' id = 'educationCity' onChange = {e => setCity(prev => {return{...prev, value: e.target.value}})} value = {city.value} placeholder = 'City...'/>

        <label htmlFor = 'fromInstitutionMonth'><h3>From:</h3></label>

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

        <label htmlFor = 'toInstitutionMonth'><h3>To:</h3></label>

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
          <label htmlFor = 'currentlyEnrolled'><h3>Currently Enrolled:</h3></label>
          <input type = 'checkbox' checked = {currentlyEnrolled} onChange = {e => setCurrentlyEnrolled(e.target.checked)} />
        </section>

        <div style = {{float: 'right', marginTop: '5px'}} onSubmit = {handleSubmit}>
              {isIsolated ? <button type = 'submit'>Submit</button> : null}
        </div>
    </div>
  )
}
