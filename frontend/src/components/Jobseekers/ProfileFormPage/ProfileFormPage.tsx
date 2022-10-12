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
import ReactScrollableFeed from 'react-scrollable-feed';
import ProfileSkillsForm from './ProfileSkillsForm/ProfileSkillsForm';

export default function ProfileFormPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.values)
    const profile = useAppSelector(state => state.profile)
    const [currentTab,setCurrentTab] = useState(1)
    const [errors,setErrors] = useState<Array<string>>([])

    const [experience,setExperience] = useState({value: [{title: '', companyName: '',  EmployerName: '', EmployerEmail: '', EmployerPhone: '', description: '', years: 1, isOnGoing: false}], popup: false, currentVal: {title: '', companyName: '', EmployerName: '', EmployerEmail: '', EmployerPhone: '', description: '', years: 1, isOnGoing: false}, isValid: true, currentErrorMsg: '', alreadyExistsMsg: 'Experience already exists'})
    const [education,setEducation] = useState({value: 'No formal education'})
    const [industry,setIndustry] = useState({value: ''})
    const [distance,setDistance] = useState({value: ''})
    const [cv,setCV] = useState<FileProps>({value: '' , name:''})
    
    const maxTabs = document.querySelectorAll('.tab').length

    useEffect(() => {
        dispatch(fetchProfile(user.id))
        .then(response => {
            if (response.meta.requestStatus === 'fulfilled') navigate(`/profile/${user.id}`)
        })
    },[dispatch, navigate, user.id])

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
        
        
        form.append('experience', JSON.stringify(experience.value.slice(1)))
        form.append('education',education.value)
        form.append('industry',industry.value)
        form.append('distance',distance.value)

            axios.post('/api/profile',form,requestOptions)
            .then(response => {
                if (response.status === 201){
                    handleAddSuccessMsg('Profile is successfully saved', dispatch)
                    navigate(`/profile/${user.id}`)
                }
                
            })

            .catch(error => {
                if (error.response.status === 400) setErrors(['Something went wrong'])
            })
    }

    function handleSetExperience(e: React.ChangeEvent<HTMLTextAreaElement>){
        setExperience(prev => ({
          ...prev,
          currentVal: {...prev.currentVal, description: e.target.value}
        }))
        e.target.value = e.target.value.replace(',','')
      }

    function handleAddExperience(){
        if (!experience.currentVal.description || !experience.currentVal.title || !experience.currentVal.EmployerName) {
            setExperience(prev => {return{...prev, isValid: false, currentErrorMsg: 'Fields are required'}})
            return
        }
        
        if (experience.value.find(exp => exp.description === experience.currentVal.description && exp.title === experience.currentVal.title && exp.EmployerName === experience.currentVal.EmployerName)) {
            setExperience(prev => {return{...prev, isValid: false, currentErrorMsg: experience.alreadyExistsMsg}})
            return
        }
        setExperience(prev => ({
            ...prev,
            value: [...prev.value, {
                title: experience.currentVal.title,
                companyName: experience.currentVal.companyName,
                EmployerName: experience.currentVal.EmployerName,
                EmployerEmail: experience.currentVal.EmployerEmail,
                EmployerPhone: experience.currentVal.EmployerPhone,
                description: experience.currentVal.description, 
                years: experience.currentVal.years || 1, 
                isOnGoing: experience.currentVal.isOnGoing}]
          }))
        
          setExperience(prev => {return{...prev, isValid: true, popup: false, currentVal: {title: '', companyName: '', EmployerName: '', EmployerEmail: '', EmployerPhone: '', description: '', years: 1, isOnGoing: false}}})
          setErrors([])
    }

    function handleRemoveExperience(idx: number){
        const newExperience = [...experience.value]
        newExperience.splice(idx, 1)
        setExperience(prev => {return{...prev, value: newExperience}})
      } 

    return (
        <form style = {{width: '60%'}}>
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
                </div>

                <div className = {`tab ${currentTab === 3 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Work Experience</h1> 
                    <Errors errors = {errors}/>
                    <label htmlFor = 'experience'><h3>Work Experience (Optional):</h3></label>
                    <button type = 'button' style = {{marginTop:'20px', display: 'block'}} onClick = {() => setExperience(prev => {return{...prev, popup: true}})}>Add</button>
                    <Popup trigger = {experience.popup} switchOff = {() => setExperience(prev => {return{...prev, popup: false}})} modalOn = {false}>
                        <h2>Add Experience:</h2>
                        <p className = 'error'>{!experience.isValid ? <li>{experience.currentErrorMsg}</li> : null}</p>

                        <label htmlFor = 'experienceTitle'><h4>Job title:</h4></label>
                        <input id = 'experienceTitle' className = {!experience.isValid ? 'inputError' : ''} onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, title: e.target.value}}))} value = {experience.currentVal.title} placeholder = 'E.g Software Engineer...' maxLength = {200} autoComplete = 'on'/>

                        <label htmlFor = 'profileExperience'><h4>Description:</h4></label>
                        <textarea id = 'profileExperience' value = {experience.currentVal.description} className = {!experience.isValid ? 'inputError' : ''}  onChange = {handleSetExperience} placeholder = 'E.g Developing mobile apps...' autoComplete = 'on'/>

                        <label htmlFor = 'profileExperienceYears'><h4>Number of years:</h4></label>
                        <input type = 'number' id = 'profileExperienceYears' value = {experience.currentVal.years} onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, years: Number(e.target.value)}}))}  min = '0' max = '10' autoComplete = 'on'/>

                        <div style = {{display: 'flex', alignItems: 'center'}}>
                            <label htmlFor = 'profileOnGoingExperience'><h4>Still doing this job:</h4></label>
                            <input type = 'checkbox' id = 'profileOnGoingExperience' checked = {experience.currentVal.isOnGoing} onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, isOnGoing: e.target.checked}}))} autoComplete = 'on'/>
                        </div>
                        
                        <label><h3>Reference</h3></label>
                        <hr className = 'mt-0-mb-4'/>
                        <label htmlFor = 'experienceCompanyName'><h4>Employer's name:</h4></label>
                        <input id = 'experienceCompanyName' className = {!experience.isValid ? 'inputError' : ''} placeholder = 'Employer name...' onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, EmployerName: e.target.value}}))} value = {experience.currentVal.EmployerName} maxLength = {200} autoComplete = 'on'/>
                        
                        <label htmlFor = 'experienceCompanyEmail'><h4>Employer's email (Optional):</h4></label>
                        <input id = 'experienceCompanyEmail' placeholder = 'Employer email...' onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, EmployerEmail: e.target.value}}))}  value = {experience.currentVal.EmployerEmail} autoComplete = 'on'/>

                        <label htmlFor = 'experienceCompanyPhone'><h4>Employer's phone (Optional):</h4></label>
                        <input type = 'tel' id = 'experienceCompanyPhone' placeholder = 'Employer phone...' onChange = {e => setExperience(prev => ({...prev, currentVal: {...prev.currentVal, EmployerPhone: e.target.value}}))}  value = {experience.currentVal.EmployerPhone} maxLength = {15} autoComplete = 'on'/>

                        <div style = {{marginTop: '15px'}}>
                            <button type = 'button' onClick = {handleAddExperience}>Submit</button>
                            <button onClick = {() => setExperience(prev => {return{...prev, popup: false}})}>Cancel</button>
                        </div>

                    </Popup>
                    
                    {experience.value.length ? <label><h2>Experience: ({experience.value.length})</h2></label>: null}

                    <div className = 'list longerList'>
                        <ReactScrollableFeed>
                           {experience.value.map((exp, index) => {
                                return (
                                    <div key = {index}>
                                        <div style = {{display: 'flex', alignItems: 'center', gap: '20px'}}>
                                          <h2>{exp.title}</h2>
                                          <span>&#9998;</span>
                                          <div onClick = {() => handleRemoveExperience(index)} className = 'cross'>X</div>

                                        </div>
                                        <p>{exp.EmployerName}</p>
                                        <p style = {{fontSize: 'small', color: 'gray'}}>Years worked - {exp.years}</p>

                                        <p>{exp.description}</p>
                                        <p>Still working this job - {exp.isOnGoing ? 'Yes' : 'No'}</p>
                                        
                                        {exp.EmployerEmail || exp.EmployerPhone ? 
                                        <div>
                                            <label><h3>Reference</h3></label>
                                            <ul>
                                                {exp.EmployerEmail ? <li>Employer's Email - {exp.EmployerEmail}</li> : null}
                                                {exp.EmployerPhone ? <li>Employer's Phone - {exp.EmployerPhone}</li> : null}
                                            </ul>
                                        </div>
                                        : null}
                                        
                                        <hr className = 'mt-0-mb-4'/>

                                    </div>
                                )
                           })}
                        </ReactScrollableFeed>
                    </div>
                </div>

                <div className = {`tab ${currentTab === 4 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Education</h1> 
                    <Errors errors = {errors}/>

                    <label htmlFor = 'education'><h3>Highest level of education:</h3></label>
                    <select id = 'education' onChange = {e => setEducation({value: e.target.value})} value = {education.value} required>
                        <option value = 'No formal education'>No formal education</option>
                        <option value = 'Secondary education'>Secondary education or high school</option>
                        <option value = 'GED'>GED</option>
                        <option value = 'Vocational qualification'>Vocational qualification</option>
                        <option value = 'A-Levels'>A-Levels</option>
                        <option value = "Bachelor's degree">Bachelor's degree</option>
                        <option value = "Master's degree">Master's degree</option>
                        <option value = 'Doctorate or higher'>Doctorate or higher</option>
                    </select>
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
        </form>
    )
}
