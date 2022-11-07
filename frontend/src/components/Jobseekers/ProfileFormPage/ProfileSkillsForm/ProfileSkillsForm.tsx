import React,{useState, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../../Global/features/hooks'
import {fetchProfile} from '../../../Global/features/Jobseekers/profiles/profile'
import {token} from '../../../Global/features/Auth/user'
import Errors from '../../../Global/messages/Errors'
import ProfileSkillsList from './ProfileSkillsList'
import axios from 'axios'
import { handleAddSuccessMsg } from '../../../Global/messages/SuccessAlert'

export default function ProfileSkillsForm({isIsolated = true, edit = false, popupOff, toggleTab}: {isIsolated?: boolean, edit?: boolean, popupOff: () => void, toggleTab: () => void}) {
    const [skills, setSkills] = useState({value: [{id: 0, name: ''}], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid skill', alreadyExists: false, alreadyExistsMsg: 'Skill already exists',AddedMsg:'Skill added',RemovedMsg: 'Skill removed'})
    const profile = useAppSelector(state => state.profile.values)
    const [errors, setErrors] = useState<Array<string>>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!edit) return
        setSkills(prev => {return{...prev, value: profile.skills}})
        skills.value = skills.value.filter(skill => skill)
    },[profile.skills, edit])

    function handleSetSkills(e: React.ChangeEvent<HTMLInputElement>){
        setSkills(prev => {return {...prev, currentVal: e.target.value}})
        e.target.value = e.target.value.replace(',','')
    }

    function handleAddSkill(){
      const currentSkill = skills.currentVal.trim()
      let errors: Array<string> = []
      
      if (currentSkill.match(/^ *$/)) {
         setSkills(prev => {return{...prev,isEmpty: true}})
          errors.push(skills.emptyErrorMsg)
      }

      else setSkills(prev => {return{...prev,isEmpty: false}})
  
      if (skills.value.filter(item => item.name === currentSkill).length > 0){
        setSkills(prev => {return {...prev,alreadyExists: true}})
          errors.push(skills.alreadyExistsMsg)
      }

      else setSkills(prev => {return {...prev,alreadyExists: false}})

      if (errors.length){
          setErrors(errors)
          return
      }

      axios.post(`/api/profile/skills?name=${currentSkill}`,null, {
          headers: {
            Authorization: `Token ${token}`
          }
      })

      .then(response => {
        if (response.status === 200) handleAddSuccessMsg('Skill added', dispatch)
      })

      setSkills(prev => {return {...prev, currentVal: ''}})
      setErrors([]) 
  }

    function handleSubmit(e: React.SyntheticEvent){
      e.preventDefault()

      const requestOptions = {
        headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
      }

      let form = new FormData()
      form.append('skills', JSON.stringify(skills.value))

      axios.post('/api/profile/skills',form, requestOptions)
      .then(response => {
        if (response.status === 200){
            dispatch(fetchProfile(profile.user.id))
            popupOff()
        }
      })

    }

  return (
    <>
        <h1 className = 'title'>Skills</h1> 
        <label htmlFor = 'skills'><h3>Specific Key skills:</h3></label>
        <input id = 'skills' className = {skills.alreadyExists || skills.isEmpty ? 'inputError' : ''} value = {skills.currentVal} onChange = {handleSetSkills} placeholder = 'E.g Good problem solving...' autoComplete = 'on' required/>
        <button type = 'button' style = {{marginTop:'10px'}} onClick = {handleAddSkill}>Add</button>
        <Errors errors = {errors}/>
        {profile.skills.length ? <p>Skills: ({profile.skills.length})</p> : null}
         <ProfileSkillsList skills = {profile.skills}/>

        <div style = {{float: 'right', marginTop: '5px'}} onClick = {() => popupOff()}>
              {isIsolated ? <button type = 'button'>Done</button> : <button onClick = {() => toggleTab()}>Next</button>}
        </div>
    </>
  )
}
