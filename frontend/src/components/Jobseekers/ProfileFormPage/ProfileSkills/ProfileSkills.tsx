import React,{useState, useEffect} from 'react'
import {useAppSelector} from '../../../Global/features/hooks'
import {ListProps} from '../../../Global/types/forms'
import List from '../../../Global/Forms/List'
import {token} from '../../../Global/features/Auth/user'
import axios from 'axios'

export default function ProfileSkills({edit = false, popupOff}: {edit: boolean, popupOff: () => void}) {
    const [skills, setSkills] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid skill', alreadyExists: false, alreadyExistsMsg: 'Skill already exists',AddedMsg:'Skill added',RemovedMsg: 'Skill removed'})
    const profile = useAppSelector(state => state.profile.values)

    useEffect(() => {
        if (!edit) return
        setSkills(prev => {return{...prev, value: profile.skills.map(skill => skill.name)}})
    },[profile.skills, edit])

    function handleSetSkills(e: React.ChangeEvent<HTMLInputElement>){
        setSkills(prev => {return {...prev, currentVal: e.target.value}})
        e.target.value = e.target.value.replace(',','')
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
            popupOff()
        }
      })

    }

  return (
    <div>
        <h1 className = 'title'>Skills</h1> 
        <label htmlFor = 'skills'><h3>Specific Key skills:</h3></label>
        <input id = 'skills' className = {skills.alreadyExists || skills.isEmpty ? 'inputError' : ''} value = {skills.currentVal} onChange = {handleSetSkills} placeholder = 'E.g Good problem solving...' autoComplete = 'on' required/>
        
        <List name = 'Skills' 
        state = {skills}
        handleAdd = {() => setSkills(prev => ({...prev, value: [...prev.value, skills.currentVal]}))}
        handleClearInput = {() => setSkills(prev => {return {...prev,currentVal: ''}})}
        handleSetIsEmpty = {(empty = true) => setSkills(prev => {return{...prev,isEmpty: empty}})}
        handleSetAlreadyExists = {(exists = true) => setSkills(prev => {return {...prev,alreadyExists: exists}})}
        handleSetAll = {(newItems: Array<string>) => setSkills(prev => {return {...prev,value: newItems}})}
        />

        {skills.value.length ? <button type = 'submit' onClick = {handleSubmit}>Submit</button> : null}
    </div>
  )
}
