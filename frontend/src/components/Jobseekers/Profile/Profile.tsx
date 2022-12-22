import React,{useState, useEffect} from 'react'
import './css/Profile.css'
import {useAppDispatch, useAppSelector} from '../../Global/features/hooks';
import {setToggleStatus,setDeleteProfile} from '../../Global/features/Jobseekers/profiles/profile'
import { ProfileProps } from '../../Global/features/Jobseekers/profiles/types/profileProps';
import {initialExperience} from '../ProfileFormPage/ProfileExperienceForm/ProfileExperienceForm';
import KebabMenu from '../../Global/KebabMenu/KebabMenu';
import {useNavigate} from 'react-router-dom';
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert';
import {token} from '../../Global/features/Auth/user';
import Popup from '../../Global/Popup/Popup';
import ProfileDetailsForm from '../ProfileFormPage/ProfileDetailsForm/ProfileDetailsForm';
import ProfileExperienceForm from '../ProfileFormPage/ProfileExperienceForm/ProfileExperienceForm';
import axios from 'axios'
import { fetchProfileExperience } from '../../Global/features/Jobseekers/profiles/profileExperience';
import ProfileExperienceList from '../ProfileFormPage/ProfileExperienceForm/ProfileExperienceList';
import ProfileSkillsList from '../ProfileFormPage/ProfileSkillsForm/ProfileSkillsList';
import ProfileSkillsForm from '../ProfileFormPage/ProfileSkillsForm/ProfileSkillsForm';
import ProfilePreferencesForm from '../ProfileFormPage/ProfilePreferencesForm/ProfilePreferencesForm';

export default function Profile({profile} : {profile: ProfileProps}) {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.values)
    const experience = useAppSelector(state => state.profileExperience)
    const [popup, setPopup] = useState({deleteExperience: {trigger: false, id: 0, title: '', company: ''}, deleteProfile: false, details: false, skills: false, experience: {trigger: false, values: initialExperience}, preferences: false})
    const [dropdown, setDropdown] = useState(false)
    const currentJob = experience.values?.find(exp => exp.isOnGoing === true)
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchProfileExperience(user.id))
    },[dispatch, user.id])
    
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
            <ProfileDetailsForm popupOff = {() => setPopup(prev => {return{...prev, details: false}})} toggleTab = {() => null}/>
            <button type = 'button' style = {{float: 'left'}} onClick = {() => setPopup(prev => {return{...prev, details: false}})}>Cancel</button>
        </Popup>

        <Popup trigger = {popup.experience.trigger} switchOff = {() => setPopup(prev => ({...prev, experience: {...prev.experience, trigger: false}}))} modalOn = {false}>
            <ProfileExperienceForm edit = {false} popupOff = {() => setPopup(prev => ({...prev, experience: {...prev.experience, trigger: false}}))} chosenExperience = {popup.experience.values}/>
        </Popup>

        <Popup trigger = {popup.skills} switchOff = {() => setPopup(prev => {return{...prev, skills: false}})} modalOn = {false}>
            <div style = {{minWidth: '300px'}}>
              <ProfileSkillsForm edit = {true} popupOff = {() => setPopup(prev => {return{...prev, skills: false}})} toggleTab = {() => null}/>
              <button type = 'button' style = {{float: 'right'}} onClick = {() => setPopup(prev => {return{...prev, skills: false}})}>Cancel</button>
            </div>
        </Popup>

        <Popup trigger = {popup.preferences}  switchOff = {() => setPopup(prev => {return{...prev, preferences: false}})}>
            <ProfilePreferencesForm profile = {profile.values} isIsolated = {true} popupOff = {() => setPopup(prev => {return{...prev, preferences: false}})}/>
        </Popup>

  
        {!user?.isAnEmployer ? 
        <KebabMenu current = {dropdown} switchOn = {() => setDropdown(true)} switchOff = {() => setDropdown(false)}>
            {profile.values.isActive ? <button className = 'dropdownBtn' onClick = {() => handleToggleStatus()}>Set profile private</button> : <button className = 'dropdownBtn normalNavBtn' onClick = {() => handleToggleStatus()}>Set profile public</button>} 
            <button className = 'dropdownBtn' onClick = {() => navigate('/create-profile')} >Edit</button>
            <button className = 'dropdownBtn redNavBtn' onClick = {() => setPopup(prev => {return{...prev, deleteProfile: true}})}>Delete</button>
        </KebabMenu>
        : null}

            <div className = 'penContainer row'>
                <p className = 'fullName'>{profile.values.firstName} {profile.values.middleName} {profile.values.lastName}</p>
               
                {!user.isAnEmployer ? 
                  <span className = 'pen' onClick = {() => setPopup(prev => {return{...prev, details: true}})}>&#9998;</span>
                : null}
            </div> 
            <p className = 'smallGrey' style = {{fontSize: 'large'}}>{currentJob?.title}</p>
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
                <p className = 'about'>{profile.values.about}</p>
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
                    <ProfileSkillsList skills = {profile.values?.skills}/>
                </section>
            </div>


            <div>
                <section className = 'profileSubContainer'>
                <div className = 'penContainer row'>
                    <label><h2>Experience</h2></label>
                    {!user.isAnEmployer ? 
                        <span className = 'pen' onClick = {() => setPopup(prev => ({...prev, experience: {...prev.experience, trigger: true, values: initialExperience}}))}>&#9998;</span>
                    : null}
                </div>
                
                <hr className = 'mt-0-mb-4'/>
                {experience.values?.length ? 
                    <>
                    <ProfileExperienceList experience = {experience.values}/>
                </>
                :
                  null
                }
               </section>
            </div>
           
            <section>
                <div className = 'penContainer row'>
                    <label><h2>Preferences</h2></label>
                    {!user.isAnEmployer ? 
                        <span className = 'pen' onClick = {() => setPopup(prev => {return{...prev, preferences: true}})}>&#9998;</span>
                    : null}
                </div>

             
                <hr className = 'mt-0-mb-4'/>
                <p>Prefered distance - Within {profile.values?.distance} miles</p>
                <p>Prefered Industry - {profile.values?.industry}</p>
            </section>

         
    
    </div>
  )
}
