import React,{useState} from 'react'
import './css/Profile.css'
import {useAppDispatch, useAppSelector} from '../../Global/features/hooks';
import {ProfileProps,setToggleStatus,setDeleteProfile} from '../../Global/features/Jobseekers/profiles/profile'
import {initialExperience} from '../ProfileFormPage/ProfileExperienceForm.tsx/ProfileExperienceForm';
import KebabMenu from '../../Global/KebabMenu/KebabMenu';
import {useNavigate} from 'react-router-dom';
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert';
import { ProfileExperienceProps } from '../ProfileFormPage/ProfileExperienceForm.tsx/types/ProfileExperienceProps';
import {token} from '../../Global/features/Auth/user';
import Popup from '../../Global/Popup/Popup';
import ProfileDetailsForm from '../ProfileFormPage/ProfileDetailsForm/ProfileDetailsForm';
import ProfileSkills from '../ProfileFormPage/ProfileSkills/ProfileSkills';
import ProfileExperienceForm from '../ProfileFormPage/ProfileExperienceForm.tsx/ProfileExperienceForm';
import ReactScrollableFeed from 'react-scrollable-feed';
import axios from 'axios'
import { fetchProfileExperience } from '../../Global/features/Jobseekers/profiles/profileExperience';

export default function Profile({profile} : {profile: ProfileProps}) {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.values)
    const experience = useAppSelector(state => state.profileExperience)
    const [popup, setPopup] = useState({deleteExperience: {trigger: false, id: 0, title: '', company: ''}, deleteProfile: false, details: false, skills: false, experience: {trigger: false, values: initialExperience}})
    const [dropdown, setDropdown] = useState(false)
    const dispatch = useAppDispatch()
    
    function handleToggleStatus(){
        axios.put('/api/toggleProfileStatus',null,{headers: {Authorization: `Token ${token}`}})
        .then(response => {
        if (response.status === 200){
            const message = response.data
            handleAddSuccessMsg(message.success, dispatch)
            dispatch(setToggleStatus())
            setDropdown(false)
            }
        })
    }

    function handleDeleteProfile(){
        axios.delete('/api/profile',{headers: {Authorization: `Token ${token}`}})
        .then(response => {
        if (response.status === 200){
            dispatch(setDeleteProfile())
            navigate('/create-profile')
            handleAddSuccessMsg('Profile is successfully removed', dispatch)
        } 

      })
    }

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
    <div id = 'profileContainer'>
        <Popup trigger = {popup.deleteProfile} switchOff = {() => setPopup(prev => {return{...prev, deleteProfile: false}})}>
            <div style = {{textAlign: 'center'}}>
                <p>Are you sure you want to remove your profile?</p>
                <p style = {{fontSize: 'small'}}>(This action cannot be undone)</p>
                <button onClick = {handleDeleteProfile}>Confirm</button>
                <button onClick = {() => setPopup(prev => {return{...prev, deleteProfile: false}})}>Cancel</button>
            </div>
        </Popup>

        <Popup trigger = {popup.details} switchOff = {() => setPopup(prev => {return{...prev, details: false}})} modalOn = {false}>
            <ProfileDetailsForm popupOff = {() => setPopup(prev => {return{...prev, details: false}})} toggleTab = {() => {}}/>
            <button type = 'button' style = {{float: 'left'}} onClick = {() => setPopup(prev => {return{...prev, details: false}})}>Cancel</button>
        </Popup>

        <Popup trigger = {popup.skills} switchOff = {() => setPopup(prev => {return{...prev, skills: false}})} modalOn = {false}>
            <div style = {{minWidth: '300px'}}>
              <ProfileSkills edit = {true} popupOff = {() => setPopup(prev => {return{...prev, skills: false}})}/>
              <button type = 'button' style = {{float: 'left'}} onClick = {() => setPopup(prev => {return{...prev, skills: false}})}>Cancel</button>
            </div>
        </Popup>

        <Popup trigger = {popup.experience.trigger} switchOff = {() => setPopup(prev => ({...prev, experience: {...prev.experience, trigger: false}}))} modalOn = {false}>
            <ProfileExperienceForm edit = {true} popupOff = {() => setPopup(prev => ({...prev, experience: {...prev.experience, trigger: false}}))} chosenExperience = {popup.experience.values}/>
        </Popup>

        <Popup trigger = {popup.deleteExperience.trigger} switchOff = {() => setPopup(prev => ({...prev, deleteExperience: {...prev.deleteExperience, trigger: false}}))}>
            <div style = {{textAlign: 'center'}}>
                <p>Are you sure you want to delete work experience - {popup.deleteExperience.title} at {popup.deleteExperience.company}?</p>
                <p style = {{fontSize: 'small', color: 'gray'}}>(This action cannot be undone)</p>
                <button onClick = {handleDeleteExperience}>Confirm</button>
                <button type = 'button' onClick = {() => setPopup(prev => ({...prev, deleteExperience: {...prev.deleteExperience, trigger: false}}))}>Cancel</button>
            </div>
        </Popup>    
 
        {!user?.isAnEmployer ? 
        <KebabMenu current = {dropdown} switchOn = {() => setDropdown(true)} switchOff = {() => setDropdown(false)}>
            {profile.values.isActive ? <button className = 'dropdownBtn' onClick = {() => handleToggleStatus()}>Set profile private</button> : <button className = 'dropdownBtn normalNavBtn' onClick = {() => handleToggleStatus()}>Set profile public</button>} 
            <button className = 'dropdownBtn' onClick = {() => setPopup(prev => {return{...prev, details: true}})} >Edit</button>
            <button className = 'dropdownBtn redNavBtn' onClick = {() => setPopup(prev => {return{...prev, deleteProfile: true}})}>Delete</button>
        </KebabMenu>
        : null}

            <div className = 'penContainer row'>
                <p className = 'fullName'>{profile.values.firstName} {profile.values.middleName} {profile.values.lastName}</p>
                {!user.isAnEmployer ? 
                  <span className = 'pen' onClick = {() => setPopup(prev => {return{...prev, details: true}})}>&#9998;</span>
                : null}
            </div> 
        
            <section className = 'row'>
                {profile.values.logo ? <img className = 'logo' src = {profile.values.logo} alt = ''/> : null}
                <div className = {profile.values.logo ? 'contact' : ''}> 
                    <p><i className = 'fa fa-phone icon'></i>000011111</p>
                    <p><i className = 'icon'>&#9993;</i>example@gmail.com</p>
                </div>
            </section>
    
            <section>
                <label><h2>About</h2></label>
                <hr className = 'mt-0-mb-4'/>
                <p className = 'sectionText'>{profile.values.about}</p>
            </section>

            <div className = 'profileSection col'>
                <section>
                    <div className = 'penContainer row'>
                        <label><h2>Skills</h2></label>
                        {!user.isAnEmployer ? 
                        <span className = 'pen' onClick = {() => setPopup(prev => {return{...prev, skills: true}})}>&#9998;</span>
                        : null}
                    </div>

                    <hr className = 'mt-0-mb-4'/>
                    <div className = 'listContainer'>
                        {profile.values?.skills?.map((skill,index) => {
                            return (<li key = {index}>{skill.name}</li>)
                        })}
                    </div>
                </section>
            </div>

            {experience.values.length ? 
            <div>
                <section className = 'profileSubContainer'>
                <label><h2>Experience</h2></label>
            
                <hr className = 'mt-0-mb-4'/>
                <ReactScrollableFeed>
                {experience.values.map((exp, index) => {
                    return (
                    <div style = {{maxHeight: '1000px'}} key = {index}>
                            <div style = {{marginBottom: '50px'}}>
                                <div style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                     <h3>{exp.title}</h3>
                                     {!user.isAnEmployer ? 
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

                {!user.isAnEmployer ? 
                        <span className = 'pen' onClick = {() => setPopup(prev => ({...prev, experience: {...prev.experience, trigger: true, values: initialExperience}}))}>&#9998;</span>
                : null}

               </section>
            </div>
               : null}
      

         
    
    </div>
  )
}
