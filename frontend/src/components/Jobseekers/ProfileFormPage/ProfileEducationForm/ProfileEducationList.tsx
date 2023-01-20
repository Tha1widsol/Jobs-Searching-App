import React,{useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../../Global/features/hooks'
import { token } from '../../../Global/features/Auth/user'
import Popup from '../../../Global/Popup/Popup'
import ProfileEducationForm from './ProfileEducationForm'
import ReactScrollableFeed from 'react-scrollable-feed'
import { initialEducation } from './ProfileEducationForm'
import { handleAddSuccessMsg } from '../../../Global/messages/SuccessAlert'
import { ProfileEducationListProps, ProfileEducationProps } from '../../../Global/features/Jobseekers/profiles/types/profileEducationProps'
import { fetchProfileEducation } from '../../../Global/features/Jobseekers/profiles/profileEducation'
import axios from 'axios'

export default function ProfileEducationList({education, allowEdit = true} : {education: ProfileEducationListProps, allowEdit?: boolean}) {
  const dispatch = useAppDispatch()
  const [popup, setPopup] = useState({education: {trigger: false, values: initialEducation}, deleteEducation: {trigger: false, id: 0, field: '', education: ''}})
  const user = useAppSelector(state => state.user.values)

  function editChosenEducation(education: ProfileEducationProps){
    setPopup(prev => ({...prev, education: {...prev.education, trigger: true, values: education}}))
  }

  function toggleDeleteExperiencePopup(id: number, field: string, education: string){
    setPopup(prev => ({...prev, deleteEducation: {...prev.deleteEducation, trigger: true, id: id, field: field, education: education}}))
  }

  function handleDeleteEducation(){
    axios.delete(`/api/profile/education?id=${popup.deleteEducation.id}`,{headers: {Authorization: `Token ${token}`}})
    .then(response => {
        if (response.status === 200){
            dispatch(fetchProfileEducation(user.id))
            setPopup(prev => ({...prev, deleteEducation: {...prev.deleteEducation, trigger: false}}))
            handleAddSuccessMsg('Education is successfully removed', dispatch)
        }
    })
}
  return education.status === 'success' ? (
    <>
     <Popup trigger = {popup.deleteEducation.trigger} switchOff = {() => setPopup(prev => ({...prev, deleteEducation: {...prev.deleteEducation, trigger: false}}))}>
            <div style = {{textAlign: 'center'}}>
                <p>Are you sure you want to delete education - {popup.deleteEducation.field} ({popup.deleteEducation.education})?</p>
                <p style = {{fontSize: 'small', color: 'gray'}}>(This action cannot be undone)</p>
                <button onClick = {handleDeleteEducation}>Confirm</button>
                <button type = 'button' onClick = {() => setPopup(prev => ({...prev, deleteEducation: {...prev.deleteEducation, trigger: false}}))}>Cancel</button>
            </div>
    </Popup>    
    
      <Popup trigger = {popup.education.trigger} switchOff = {() => setPopup(prev => ({...prev, education: {...prev.education, trigger: false}}))} modalOn = {false}>
         <ProfileEducationForm popupOff = {() => setPopup(prev => ({...prev, education: {...prev.education, trigger: false}}))} chosenEducation = {popup.education.values}/>
      </Popup>

     <ReactScrollableFeed>
        {education.values?.map(education => {
          return (
            <div key = {education.id}>
              <section className = 'rowSections'>
                    <h3>{education.field}</h3>
                    {allowEdit ? 
                    <div className = 'rowSections editTrash'>
                        <span className = 'pen' onClick = {() => editChosenEducation(education)}>&#9998;</span>
                        <i className = 'fa fa-trash-o' onClick = {() => toggleDeleteExperiencePopup(education.id, education.field, education.education)}/>
                    </div>
                    : null}
                </section>
                
                <p>{education.education} {education.institution ? `- ${education.institution}` : null}</p>
                {education.fromDate && education.toDate ? 
                  <p className = 'smallGrey'>{education.fromDate} - {education.currentlyEnrolled ? 'Present' : education.toDate}</p>
                  : null
                  }
                <hr className = 'mt-0-mb-4'/>
            </div>
          )
        })}
      </ReactScrollableFeed>
    </>
  ) 
  : education.status === 'loading' ? <p>Loading...</p>
  : null
}
