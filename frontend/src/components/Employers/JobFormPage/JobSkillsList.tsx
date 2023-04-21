import React,{useState, useEffect} from 'react'
import { JobSkillsProps } from '../../../features/Employers/jobs/types/jobSkillsProps'
import { useAppSelector, useAppDispatch } from '../../../app/hooks'
import { fetchJob } from '../../../features/Employers/jobs/job'
import Popup from '../../Global/Popup/Popup'
import ReactScrollableFeed from 'react-scrollable-feed';
import { editSkill } from '../../../features/Employers/jobs/job'
import axios from 'axios'

export default function JobSkillsList({skills, allowEdit = true}: {skills: JobSkillsProps['values'], allowEdit?: boolean}) {
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)
  const [popup, setPopup] = useState({skills: false, editSkill: {trigger: false, skill: {id: 0, name: '', specific: false}}, deleteSkills: {trigger: false, skill: {id: 0, name: ''}}})

  useEffect(() => {
    dispatch(fetchJob(user.values?.id))
  },[dispatch, user.values?.id])

  function handleRemoveSkill(skillID: number){
    axios.delete(`/api/job/skills?id=${skillID}`)
    .then(response => {
        if (response.status === 200) {
            dispatch(fetchJob(user.values?.id))
            setPopup(prev => ({...prev, deleteSkills: {...prev.deleteSkills, trigger: false}}))
        }
    })
  }

  function handleEditSkill(e: React.SyntheticEvent){
    e.preventDefault()
    const requestOptions = {
        headers: {'Content-Type': 'multipart/form-data'}
    }

    let form = new FormData()
    form.append('name', popup.editSkill.skill.name)
    form.append('specific', String(popup.editSkill.skill.specific))

    axios.put(`/api/job/skills?id=${popup.editSkill.skill.id}`,form,requestOptions)
    .then(response => {
        if (response.status === 200) {
            const skill = response.data.skill
            dispatch(editSkill(skill))
            setPopup(prev => ({...prev, editSkill: {...prev.editSkill, trigger: false}}))
        }
    })

  }

  return (
    <>
        <Popup trigger = {popup.editSkill.trigger} switchOff = {() => setPopup(prev => ({...prev, editSkill: {...prev.editSkill, trigger: false}}))}>
            <form style = {{textAlign: 'center', width: 'unset'}} onSubmit = {handleEditSkill}>
                <h2>Edit Skill</h2>
                <input type = 'text' value = {popup.editSkill.skill.name} onChange = {e => setPopup(prev => ({...prev, editSkill: {...prev.editSkill, skill: {...prev.editSkill.skill, name: e.target.value}}}))}/>
                <div className = 'row' style = {{alignItems: 'center', marginTop: '20px', marginBottom: '5px'}}>
                    <label>Specific:</label>
                    <input type = 'checkbox' checked = {popup.editSkill.skill.specific} onChange = {e => setPopup(prev => ({...prev, editSkill: {...prev.editSkill, skill: {...prev.editSkill.skill, specific: e.target.checked}}}))}/>
                </div>
            
                <button>Confirm</button>
                <button type = 'button' onClick = {() => setPopup(prev => ({...prev, editSkill: {...prev.editSkill, trigger: false}}))}>Cancel</button>
            </form>
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
                                 
                                        <div className = 'rowSections editTrash'>
                                            {allowEdit ? 
                                            <>
                                                <span className = 'pen' onClick = {() => setPopup(prev => ({...prev, editSkill: {...prev.editSkill, trigger: true, skill: skill}}))}>&#9998;</span>
                                                <i className = 'fa fa-trash-o' onClick = {() => setPopup(prev => ({...prev, deleteSkills: {...prev.deleteSkills, trigger: true, skill: {id: skill.id, name: skill.name}}}))}/> 
                                            </>
                                            : null}
                                        </div>
                                   
                            </div>
                        ): null
                    })}
                </ReactScrollableFeed>
            </div>

    </>
 
  )
}
