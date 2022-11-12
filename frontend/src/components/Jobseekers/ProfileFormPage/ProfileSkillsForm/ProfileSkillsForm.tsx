import React,{useState, useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../../../Global/features/hooks'
import Errors from '../../../Global/messages/Errors'
import {token} from '../../../Global/features/Auth/user'
import axios from 'axios'

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
        if (response.status === 200) {
          popupOff()
        }
      })

      setSkills(prev => {return {...prev, currentVal: ''}})
      setErrors([]) 
  }


  return (
    <>
        <h1 className = 'title'>Skills</h1> 
        <Errors errors = {errors}/>
        <label htmlFor = 'skills'><h3>Specific Key skills:</h3></label>
        <input id = 'skills' className = {skills.alreadyExists || skills.isEmpty ? 'inputError' : ''} value = {skills.currentVal} onChange = {handleSetSkills} placeholder = 'E.g Good problem solving...' autoComplete = 'on' required/>
        <button type = 'button' style = {{padding: '10px', width: 'auto'}} onClick = {handleAddSkill}>Add</button>
  

       
    </>
  )
}
