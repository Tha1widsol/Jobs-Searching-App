import axios from 'axios';
import React,{ useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../Global/features/hooks';
import { ProfileProps } from '../../../Global/features/Jobseekers/profiles/types/profileProps';
import { FileProps } from '../../../Global/types/forms';
import { token } from '../../../Global/features/Auth/user';
import Errors from '../../../Global/messages/Errors';
import { handleAddSuccessMsg } from '../../../Global/messages/SuccessAlert';

export default function ProfilePreferencesForm({profile}: {profile: ProfileProps['values']}) {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [industry, setIndustry] = useState({value: 'Any'})
    const [distance, setDistance] = useState({value: 'Any'})
    const [cv, setCV] = useState<FileProps>({value: '', name:''})
    const [errors, setErrors] = useState<Array<string>>([])

    function handleSubmitForm(e: React.SyntheticEvent){
      e.preventDefault()

      const requestOptions = {
          headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
      }

      let form = new FormData();

      if (cv.value)
         form.append('cv', cv.value, cv.name)

        form.append('industry', industry.value)
        form.append('distance', distance.value)

          axios.post('/api/profile',form, requestOptions)
          .then(response => {
              if (response.status === 201){
                  handleAddSuccessMsg('Profile is successfully saved', dispatch)
                  navigate(`/profile/${profile.user?.id}`)
              }
              
          })

          .catch(error => {
              if (error.response.status === 400) setErrors(['Something went wrong'])
          })
  }

  return (
    <form onSubmit = {handleSubmitForm}>
        <h1 className = 'title'>Preferences</h1> 
        <label htmlFor = 'industry'><h3>Industry: (What job industry are you looking to work in ?)</h3></label>
        <select id = 'industry' onChange = {e => setIndustry({value: e.target.value})} value = {industry.value} autoComplete = 'on'>
            <option value = 'Any'>Any</option>
            <option value = 'Beauty'>Beauty</option>
            <option value = 'Construction'>Construction</option>
            <option value = 'Information Technology'>Information Technology</option>
        </select>
        
        <label htmlFor = 'cv'><h3>Resume / CV (Optional) (Please submit only .pdf, .doc or .docx files):</h3></label>
        <input type = 'file' id = 'cv' accept = '.pdf,.doc,.docx' onChange = {e => {if (!e.target.files) return; setCV({value: e.target.files[0],name: e.target.files[0].name})}} autoComplete = 'on'/>

        <label htmlFor = 'distance'><h3>Job within:</h3></label>
        <select id = 'distance' onChange = {e => setDistance({value: e.target.value})} value = {distance.value} autoComplete = 'on'>
            <option value = 'Any'>Any</option>
            <option value = '10'>10 miles</option>
            <option value = '20'>20 miles</option>
            <option value = '30'>30 miles</option>
            <option value = '40'>40 miles</option>
            <option value = '50+'>50 miles</option>
        </select>
      <button style = {{float: 'right'}}>Submit</button>
    </form>
  )
}
