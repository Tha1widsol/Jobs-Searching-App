import React,{useState} from 'react'
import Popup from '../../../Global/Popup/Popup'
import ProfileEducationForm from './ProfileEducationForm'
import ReactScrollableFeed from 'react-scrollable-feed'
import { initialEducation } from './ProfileEducationForm'
import { ProfileEducationListProps, ProfileEducationProps } from '../../../Global/features/Jobseekers/profiles/types/profileEducationProps'

export default function ProfileEducationList({education, allowEdit = true} : {education: ProfileEducationListProps, allowEdit?: boolean}) {
  const [popup, setPopup] = useState({education: {trigger: false, values: initialEducation}})

  function editChosenEducation(education: ProfileEducationProps){
    setPopup(prev => ({...prev, education: {...prev.education, trigger: true, values: education}}))
}

  return education.status === 'success' ? (
    <>
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
                        <i className = 'fa fa-trash-o'/>
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
