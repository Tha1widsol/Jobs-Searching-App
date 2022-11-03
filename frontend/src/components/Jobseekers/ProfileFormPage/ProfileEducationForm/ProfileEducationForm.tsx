import React,{useState} from 'react'

export default function ProfileEducationForm({isIsolated = true, toggleTab}: {isIsolated?: boolean, toggleTab: () => void}) {
    const [education, setEducation] = useState({value: 'No formal education'})

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

        <div style = {{float: 'right', marginTop: '5px'}} onSubmit = {handleSubmit}>
              {isIsolated ? <button type = 'submit'>Submit</button> : <button>Next</button>}
        </div>
    </div>
  )
}
