import React,{useState, useEffect} from 'react'
import ReactScrollableFeed from 'react-scrollable-feed';
import { ProfileExperienceListProps } from '../../../Global/features/Jobseekers/profiles/profileExperience';
import { ProfileExperienceProps } from './types/ProfileExperienceProps';
import ProfileExperienceForm, { initialExperience } from './ProfileExperienceForm';
import { useAppSelector, useAppDispatch } from '../../../Global/features/hooks';
import { fetchProfileExperience } from '../../../Global/features/Jobseekers/profiles/profileExperience';
import { handleAddSuccessMsg } from '../../../Global/messages/SuccessAlert';
import { token } from '../../../Global/features/Auth/user';
import Popup from '../../../Global/Popup/Popup';
import axios from 'axios'

export default function ProfileExperienceList({experience, allowEdit = true}: {experience: ProfileExperienceListProps['values'], allowEdit?: boolean}) {
    const dispatch = useAppDispatch()
    const [popup, setPopup] = useState({experience: {trigger: false, values: initialExperience}, deleteExperience: {trigger: false, id: 0, title: '', company: ''}})
    const user = useAppSelector(state => state.user.values)

    useEffect(() => {
        axios.get(`/api/checkProfileExists?id=${user.id}`)
        .then(response => {
            const data = response.data
            if (data.exists){
                 dispatch(fetchProfileExperience(user.id))
            }
        })
    },[dispatch, user.id])

    function editChosenExperience(experience: ProfileExperienceProps){
        setPopup(prev => ({...prev, experience: {...prev.experience, trigger: true, values: experience}}))
    }

    function toggleDeleteExperiencePopup(id: number, titleName: string, companyName: string){
        setPopup(prev => ({...prev, deleteExperience: {...prev.deleteExperience, trigger: true, id: id, title: titleName, company: companyName}}))
    }

    function handleDeleteExperience(){
        axios.delete(`/api/profileExperience?id=${popup.deleteExperience.id}`,{headers: {Authorization: `Token ${token}`}})
        .then(response => {
            if (response.status === 200){
                dispatch(fetchProfileExperience(user.id))
                setPopup(prev => ({...prev, deleteExperience: {...prev.deleteExperience, trigger: false}}))
                handleAddSuccessMsg('Experience is successfully removed', dispatch)
            }
        })
    }

  return (
    <>
    <Popup trigger = {popup.deleteExperience.trigger} switchOff = {() => setPopup(prev => ({...prev, deleteExperience: {...prev.deleteExperience, trigger: false}}))}>
            <div style = {{textAlign: 'center'}}>
                <p>Are you sure you want to delete work experience - {popup.deleteExperience.title} {popup.deleteExperience.id} at {popup.deleteExperience.company}?</p>
                <p style = {{fontSize: 'small', color: 'gray'}}>(This action cannot be undone)</p>
                <button onClick = {handleDeleteExperience}>Confirm</button>
                <button type = 'button' onClick = {() => setPopup(prev => ({...prev, deleteExperience: {...prev.deleteExperience, trigger: false}}))}>Cancel</button>
            </div>
    </Popup>    

    <Popup trigger = {popup.experience.trigger} switchOff = {() => setPopup(prev => ({...prev, experience: {...prev.experience, trigger: false}}))} modalOn = {false}>
            <ProfileExperienceForm edit = {true} popupOff = {() => setPopup(prev => ({...prev, experience: {...prev.experience, trigger: false}}))} chosenExperience = {popup.experience.values}/>
        </Popup>


    <ReactScrollableFeed>
    {experience.map((exp, index) => {
        return (
        <div style = {{maxHeight: '1000px'}} key = {index}>
                <div style = {{marginBottom: '50px'}}>
                    <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <h3>{exp.title}</h3>
                        {allowEdit ? 
                        <div style = {{display: 'flex', gap: '20px'}}>
                            <span className = 'pen' onClick = {() => editChosenExperience(exp)}>&#9998;</span>
                            <i className = 'fa fa-trash-o' onClick = {() => toggleDeleteExperiencePopup(exp.id, exp.title, exp.companyName)}/>
                        </div>
                        : null}
                    </div>
                    <p>{exp.companyName}</p>
                    <p style = {{color: 'gray', fontSize: 'small'}}>{exp.years > 0 ? `Years worked - ${exp.years}` : null}</p>
                    <p style = {{ maxHeight: '120px'}}>{exp.description}</p>

                    <div style = {{marginTop: '40px'}}>
                        <p><b>Reference:</b></p>
                        <p>{exp.EmployerName}</p>
                        <p>{exp.EmployerEmail}</p>
                        <p>{exp.EmployerPhone}</p>
                    </div>

                </div>

            </div>
        
        
        )
    })}

    </ReactScrollableFeed>
    </>
  )
}
