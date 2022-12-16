import React,{useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import Errors from '../../Global/messages/Errors'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks';
import {fetchProfile} from '../../Global/features/Jobseekers/profiles/profile';
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert';
import {FileProps} from '../../Global/types/forms';
import axios from 'axios';
import {token} from '../../Global/features/Auth/user';
import Popup from '../../Global/Popup/Popup';
import ProfileDetailsForm from './ProfileDetailsForm/ProfileDetailsForm';
import ProfileSkillsForm from './ProfileSkillsForm/ProfileSkillsForm';
import ProfileExperienceForm from './ProfileExperienceForm.tsx/ProfileExperienceForm';
import ProfileExperienceList from './ProfileExperienceForm.tsx/ProfileExperienceList';
import ProfileEducationForm from './ProfileEducationForm/ProfileEducationForm';
import ProfileSkillsList from './ProfileSkillsForm/ProfileSkillsList';
import ProfilePreferencesForm from './ProfilePreferencesForm/ProfilePreferencesForm';

export default function ProfileFormPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const profile = useAppSelector(state => state.profile)
    const [currentTab,setCurrentTab] = useState(1)
    const [popup, setPopup] = useState({experience: false})
    const experience = useAppSelector(state => state.profileExperience)
    
    const maxTabs = document.querySelectorAll('.tab').length

    useEffect(() => {
        dispatch(fetchProfile(user.values?.id))
    },[user.values?.id, dispatch])

    return (
        <div style = {{width: '60%', margin: '0 auto'}}>
            <div className = 'steps'>
                <span className = {`step ${currentTab === 1 ? 'active' : currentTab > 1 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(1) : null}><p className = 'step-label'>Personal Details</p></span>
                <span className = {`step ${currentTab === 2 ? 'active' : currentTab > 2 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(2) : null}><p className = 'step-label'>Skills</p></span>
                <span className = {`step ${currentTab === 3 ? 'active' : currentTab > 3 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(3) : null}><p className = 'step-label'>Work Experience</p></span>
                <span className = {`step ${currentTab === 4 ? 'active' : currentTab > 4 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(4) : null}><p className = 'step-label'>Education</p></span>
                <span className = {`step ${currentTab === 5 ? 'active' : currentTab > 5 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(5) : null}><p className = 'step-label'>Preferences</p></span>
            </div>
            
                <div className = {`tab ${currentTab === 1 ? 'show' : 'hide'}`}>
                      <ProfileDetailsForm popupOff = {() => {}} isIsolated = {false} toggleTab = {() => setCurrentTab(currentTab + 1)}/>
                </div>

                <div className = {`tab ${currentTab === 2 ? 'show' : 'hide'}`}>
                    <ProfileSkillsForm popupOff = {() => null} isIsolated = {false} toggleTab = {() => setCurrentTab(currentTab + 1)}/>
                    <h4>Skills ({profile.values?.skills.length}):</h4>
                    <ProfileSkillsList skills = {profile.values?.skills}/>

                </div>

                <div className = {`tab ${currentTab === 3 ? 'show' : 'hide'}`}>
                    <h1 style = {{textAlign: 'center'}}><u>Work Experience:</u></h1>
                    <Popup trigger = {popup.experience} switchOff = {() => setPopup(prev => {return{...prev, experience: false}})}> 
                          <ProfileExperienceForm edit = {false} popupOff = {() => setPopup(prev => {return{...prev, experience: false}})}/>
                    </Popup>
                    <button onClick = {() => setPopup(prev => {return{...prev, experience: true}})}>Add</button>
                    <hr className = 'mt-0-mb-4'/>
                    <ProfileExperienceList experience = {experience.values}/>

                </div>

                <div className = {`tab ${currentTab === 4 ? 'show' : 'hide'}`}>
                    <ProfileEducationForm isIsolated = {false}/>
                </div>

                <div className = {`tab ${currentTab === 5 ? 'show' : 'hide'}`}>
                    <ProfilePreferencesForm profile = {profile.values}/>

                </div>
                
                <div className = 'row' style = {{marginTop: '10px', justifyContent: 'space-between', alignItems: 'center'}}>
                    {currentTab > 1 && currentTab <= maxTabs ? <button onClick = {() => setCurrentTab(currentTab - 1)}>Previous</button> : null}
                    {currentTab > 1 && currentTab < maxTabs ? <button onClick = {() => setCurrentTab(currentTab + 1)}>Next</button>: null}
                </div>
        </div>
    )
}
