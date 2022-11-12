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

export default function ProfileFormPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const profile = useAppSelector(state => state.profile)
    const [currentTab,setCurrentTab] = useState(1)
    const [errors,setErrors] = useState<Array<string>>([])
    const [popup, setPopup] = useState({experience: false})
    const [industry,setIndustry] = useState({value: ''})
    const [distance,setDistance] = useState({value: ''})
    const [cv,setCV] = useState<FileProps>({value: '' , name:''})
    const experience = useAppSelector(state => state.profileExperience)
    
    const maxTabs = document.querySelectorAll('.tab').length

    const validateForm = () => {
        let isValid = true
        let errors : Array<string> = []

        if (!isValid){
            setErrors(errors)
            window.scrollTo(0, 0)
            return
        }

        setErrors([])
        setCurrentTab(currentTab + 1)

        return isValid
    }

    function handleSubmitForm(e: React.SyntheticEvent){
        e.preventDefault()

        if (!validateForm()) return
        const requestOptions = {
            headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
        }

        let form = new FormData();

        if (cv.value)
           form.append('cv',cv.value,cv.name)

        form.append('industry',industry.value)
        form.append('distance',distance.value)

            axios.post('/api/profile',form,requestOptions)
            .then(response => {
                if (response.status === 201){
                    handleAddSuccessMsg('Profile is successfully saved', dispatch)
                    navigate(`/profile/${user.values?.id}`)
                }
                
            })

            .catch(error => {
                if (error.response.status === 400) setErrors(['Something went wrong'])
            })
    }

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
                          <ProfileExperienceForm edit = {true} popupOff = {() => setPopup(prev => {return{...prev, experience: false}})}/>
                    </Popup>
                    <button onClick = {() => setPopup(prev => {return{...prev, experience: true}})}>Add</button>
                    <ProfileExperienceList experience = {experience.values}/>
                    <button style = {{float: 'right'}} onClick = {() => setCurrentTab(currentTab + 1)}>Next</button>
                </div>

                <div className = {`tab ${currentTab === 4 ? 'show' : 'hide'}`}>
                    <ProfileEducationForm isIsolated = {false} toggleTab = {() => setCurrentTab(currentTab + 1)}/>
                </div>

                <div className = {`tab ${currentTab === 5 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Preferences</h1> 
                    <Errors errors = {errors}/>
                    <label htmlFor = 'industry'><h3>Industry: (What job industry are you looking to work in ?)</h3></label>
                    <select id = 'industry' onChange = {e => setIndustry({value: e.target.value})} defaultValue = {profile.values?.industry} autoComplete = 'on'>
                        <option value = 'Any'>Any</option>
                        <option value = 'Beauty'>Beauty</option>
                        <option value = 'Construction'>Construction</option>
                        <option value = 'Information Technology'>Information Technology</option>
                    </select>
                    
                    <label htmlFor = 'cv'><h3>Resume / CV (Optional) (Please submit only .pdf, .doc or .docx files):</h3></label>
                    <input type = 'file' id = 'cv' accept = '.pdf,.doc,.docx' onChange = {e => {if (!e.target.files) return; setCV({value: e.target.files[0],name: e.target.files[0].name})}} autoComplete = 'on'/>

                    <label htmlFor = 'distance'><h3>Job within:</h3></label>
                    <select id = 'distance' onChange = {e => setDistance({value: e.target.value})} value = {distance.value} autoComplete = 'on'>
                        <option value = 'Any'>Any</option>
                        <option value = '10'>10 miles</option>
                        <option value = '20'>20 miles</option>
                        <option value = '30'>30 miles</option>
                        <option value = '40'>40 miles</option>
                        <option value = '50+'>50 miles</option>
                    </select>


                </div>
                
                <div style = {{marginTop: '10px'}}>
                    {currentTab === maxTabs ? <button type = 'button' id = 'submit' onClick = {handleSubmitForm}>Submit</button> : null}
                    {currentTab < maxTabs && currentTab > 1 ? <button onClick = {() => setCurrentTab(currentTab - 1)}>Previous</button> : null}
                </div>
        </div>
    )
}
