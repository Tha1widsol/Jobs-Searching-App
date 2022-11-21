import React,{useState, useEffect} from 'react'
import { ProfileSkillsProps } from '../../../Global/features/Jobseekers/profiles/types/profileSkillsProps'
import { useAppSelector, useAppDispatch } from '../../../Global/features/hooks'
import axios from 'axios'
import { fetchProfile } from '../../../Global/features/Jobseekers/profiles/profile'
import Popup from '../../../Global/Popup/Popup'
import ReactScrollableFeed from 'react-scrollable-feed';

export default function ProfileSkillsList({skills, edit = true}: {skills: ProfileSkillsProps['values'], edit?: boolean}) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const [popup, setPopup] = useState({skills: false, editSkill: {trigger: false, skill: {id: 0, name: '', specific: false}, value: ''}, deleteSkills: {trigger: false, skill: {id: 0, name: ''}}})

  useEffect(() => {
    dispatch(fetchProfile(user.values?.id))
  },[dispatch, user.values?.id])

  function handleRemoveSkill(skillID: number){
    axios.delete(`/api/profile/skills?id=${skillID}`)
    .then(response => {
        if (response.status === 200) {
            dispatch(fetchProfile(user.values?.id))
            setPopup(prev => ({...prev, deleteSkills: {...prev.deleteSkills, trigger: false}}))
        }
    })
  }

  function handleEditSkill(e: React.SyntheticEvent){
    e.preventDefault()
    axios.put(`'/api/profile/skills?id=${popup.editSkill.skill}`)
  }

  return (
    <>
    <Popup trigger = {popup.editSkill.trigger} switchOff = {() => setPopup(prev => ({...prev, editSkill: {...prev.editSkill, trigger: false}}))}>
        <div style = {{textAlign: 'center'}}>
            <h2>Edit Skill</h2>
            <input type = 'text' value = {popup.editSkill.value} onChange = {e => setPopup(prev => ({...prev, editSkill: {...prev.editSkill, value: e.target.value}}))}/>
            <button type = 'button'>Confirm</button>
            <button type = 'button' onClick = {() => setPopup(prev => ({...prev, editSkill: {...prev.editSkill, trigger: false}}))}>Cancel</button>
        </div>
    </Popup>

    <Popup trigger = {popup.deleteSkills.trigger} switchOff = {() => setPopup(prev => ({...prev, deleteSkills: {...prev.deleteSkills, trigger: false}}))}>
        <div style = {{textAlign: 'center'}}>
            <p>Are you sure you want to remove your skill: '{popup.deleteSkills.skill.name}'?</p>
            <button type = 'button' onClick = {() => handleRemoveSkill(popup.deleteSkills.skill.id)}>Confirm</button>
            <button type = 'button' onClick = {() => setPopup(prev => ({...prev, deleteSkills: {...prev.deleteSkills, trigger: false}}))}>Cancel</button>
        </div>
    </Popup>

        <div className = 'listContainer'>
            <ReactScrollableFeed>
                {skills.map((skill, index) => {
                    return skill.name !== '' ? (
                        <div className = 'rowSections' key = {index}>
                                <li>{skill.name} <span className = 'smallGrey'>- {skill.specific ? 'Specific' : 'Generic'}</span></li>
                                {edit ? 
                                    <div className = 'rowSections editTrash'>
                                        <span className = 'pen' onClick = {() => setPopup(prev => ({...prev, editSkill: {...prev.editSkill, trigger: true, skill: skill, value: skill.name}}))}>&#9998;</span>
                                        <i className = 'fa fa-trash-o' onClick = {() => setPopup(prev => ({...prev, deleteSkills: {...prev.deleteSkills, trigger: true, skill: {id: skill.id, name: skill.name}}}))}/> 
                                    </div>
                                : null}
                        </div>
                    ): null
                })}
            </ReactScrollableFeed>
        </div>

    </>
 
  )
}
