import React,{useState, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../../Global/features/hooks'
import { addSkill } from '../../../Global/features/Jobseekers/profiles/profile'
import Errors from '../../../Global/messages/Errors'
import {token} from '../../../Global/features/Auth/user'
import axios from 'axios'

export default function ProfileSkillsForm({isIsolated = true, edit = false, popupOff, toggleTab}: {isIsolated?: boolean, edit?: boolean, popupOff: () => void, toggleTab: () => void}) {
    const [skills, setSkills] = useState({value: [{id: 0, name: ''}], currentSkill: {id: 0, name: '', specific: false}, isEmpty: false, emptyErrorMsg: 'Invalid skill', alreadyExists: false, alreadyExistsMsg: 'Skill already exists',AddedMsg:'Skill added',RemovedMsg: 'Skill removed'})
    const profile = useAppSelector(state => state.profile.values)
    const [errors, setErrors] = useState<Array<string>>([])
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!edit) return
        setSkills(prev => {return{...prev, value: profile.skills}})
        skills.value = skills.value.filter(skill => skill)
    },[profile.skills, edit])

    function handleSetSkills(e: React.ChangeEvent<HTMLInputElement>){
        setSkills(prev => ({...prev, currentSkill: {...prev.currentSkill, name: e.target.value}}))
        e.target.value = e.target.value.replace(',','')
    }

    function handleAddSkill(e: React.SyntheticEvent){
      e.preventDefault()
      const currentSkill = skills.currentSkill.name.trim()
      let errors: Array<string> = []
      
      if (currentSkill.match(/^ *$/)) {
         setSkills(prev => {return{...prev,isEmpty: true}})
          errors.push(skills.emptyErrorMsg)
      }

      else setSkills(prev => {return{...prev,isEmpty: false}})
  
      if (profile.skills?.filter(item => item.name === currentSkill).length > 0){
          setSkills(prev => {return {...prev,alreadyExists: true}})
          errors.push(skills.alreadyExistsMsg)
      }

      else setSkills(prev => {return {...prev,alreadyExists: false}})

      if (errors.length){
          setErrors(errors)
          return
      }

      const requestOptions = {
        headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
     }

      let form = new FormData();
      form.append('name', currentSkill)
      form.append('specific', String(skills.currentSkill.specific))

      axios.post(`/api/profile/skills`,form, requestOptions)
      .then(response => {
        if (response.status === 200) {
          const skill = response.data.skill
          dispatch(addSkill(skill))
          setSkills(prev => {return{...prev, currentSkill: {id: 0, name: '', specific: false}}})
          popupOff()
        }
      })

      setSkills(prev => {return {...prev, currentVal: ''}})
      setErrors([]) 
  }

  return (
    <form onSubmit = {handleAddSkill}>
        <h1 className = 'title'>Skills</h1> 
        <Errors errors = {errors}/>
        <label htmlFor = 'skills'><h3>Specific Key skills:</h3></label>
        <input id = 'skills' className = {skills.alreadyExists || skills.isEmpty ? 'inputError' : ''} value = {skills.currentSkill.name} onChange = {handleSetSkills} placeholder = 'E.g Good problem solving...' autoComplete = 'on' required/>
        <button type = 'submit' style = {{padding: '10px', width: 'auto'}}>Add</button>
        <span className = 'row'>
          <label><p>Specific:</p></label>
          <input id = 'skillType' type = 'checkbox' onChange = {e => setSkills(prev => ({...prev, currentSkill: {...prev.currentSkill, specific: e.target.checked}}))}/>
        </span>
    </form>
  )
}
