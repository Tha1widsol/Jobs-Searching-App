import React,{useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom';
import Errors from '../../Global/messages/Errors'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks';
import {setMessage} from '../../Global/features/successMsg';
import {handleFixName} from '../../Global/formFunctions';
import {ListProps,FileProps} from '../../Global/types/forms';
import List from '../../Global/Forms/List';
import axios from 'axios';
import {token} from '../../Global/features/Auth/user';
import {fetchProfile} from '../../Global/features/Jobseekers/profiles/profile';

export default function ProfileFormPage({edit = false}: {edit?: boolean}) {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user.values)
    const profile = useAppSelector(state => state.profile)
    const [currentTab,setCurrentTab] = useState(1)
    const [errors,setErrors] = useState<Array<string>>([])
    const [firstName,setFirstName] = useState({value: '', isValid: true, errorMsg: 'First name is invalid'})
    const [middleName,setMiddleName] = useState({value: '', isValid: true, errorMsg: 'Middle name is invalid'})
    const [lastName,setLastName] = useState({value: '', isValid: true, errorMsg: 'Last name is invalid'})
    const [phone,setPhone] = useState({value: '', isValid: true, errorMsg: 'Phone number is invalid'})
    const [about,setAbout] = useState({value: '', isValid: true, currentLength: Number(profile?.values?.about?.length), maxLength: 250, errorMsg: 'About section needs to have atleast 100 characters'})
    const [skills,setSkills] = useState<ListProps>({value: [], currentVal: '',isEmpty: false, emptyErrorMsg: 'Invalid skill', alreadyExists: false, alreadyExistsMsg: 'Skill already exists',AddedMsg:'Skill added',RemovedMsg: 'Skill removed'})
    const [experience,setExperience] = useState({value: '', isValid: true, errorMsg: 'Experience section is invalid',currentLength: Number(profile?.values?.experience?.length), maxLength: 450})
    const [education,setEducation] = useState({value: 'No formal education'})
    const [industry,setIndustry] = useState({value: ''})
    const [distance,setDistance] = useState({value: ''})
    const [logo,setLogo] = useState<FileProps>({value: '', name:''})
    const [cv,setCV] = useState<FileProps>({value: '' , name:''})
 
    const maxTabs = document.querySelectorAll('.tab').length

    useEffect(() => {
        dispatch(fetchProfile(user.id))
        .then(response => {
            if (!edit){
                if (response.meta.requestStatus === 'fulfilled') navigate(`/profile/${user.id}`)

                else if (response.meta.requestStatus === 'rejected') navigate('/create-profile')
                return
            }
          
        })

        setFirstName(prev => {return{...prev, value: profile.values?.firstName}})
        setMiddleName(prev => {return{...prev, value: profile.values?.middleName || ''}})
        setLastName(prev => {return{...prev, value: profile.values?.lastName}})
        setPhone(prev => {return{...prev, value: profile.values?.phone}})
        setAbout(prev => {return{...prev, value: profile.values?.about}})
        setSkills(prev => {return{...prev, value: profile.values?.skills.map(skill => skill.name)}})
        setExperience(prev => {return{...prev, value: profile.values?.experience || ''}})
        setEducation(prev => {return{...prev, value: profile.values?.education}})
        setIndustry(prev => {return{...prev, value: profile.values?.industry}})
        setDistance(prev => {return{...prev, value: profile.values?.distance}})
    
     },[dispatch, 
        user.id, 
        edit,
        profile.values.firstName,
        profile.values.middleName,
        profile.values.lastName,
        profile.values.phone,
        profile.values.about,
        profile.values.experience,
        profile.values.education,
        profile.values.industry,
        profile.values.distance
    ])

    const validateForm = () => {
        let isValid = true
        let errors : Array<string> = []
        const letters = /^[A-Za-z]+$/
        const numbers = /[0-9]/g

        switch(currentTab){
          case 1: 
            if (!firstName.value.match(letters)){
                setFirstName(prev => {return {...prev,isValid: false}})
                errors.push(firstName.errorMsg)
                isValid = false
            }
    
            else setFirstName(prev => {return {...prev,isValid: true}})
    
            if (middleName.value !== '' && !middleName.value?.match(letters)){
                setMiddleName(prev => {return {...prev,isValid: false}})
                errors.push(middleName.errorMsg)
                isValid = false
            }
    
            else setMiddleName(prev => {return {...prev,isValid: true}})
    
            if (!lastName.value.match(letters)){
                setLastName(prev => {return {...prev,isValid: false}})
                errors.push(lastName.errorMsg)
                isValid = false
            }
    
            else setLastName(prev => {return {...prev,isValid: true}})

            if (!phone.value.match(numbers) || phone.value.length < 9){
                setPhone(prev => {return {...prev, isValid: false}})
                errors.push(phone.errorMsg)
                isValid = false
            }

            else setPhone(prev => {return {...prev, isValid: true}})

            if (about.value.length < 100){
                setAbout(prev => {return {...prev,isValid: false}})
                errors.push(about.errorMsg)
                isValid = false
            }
    
            else setAbout(prev => {return {...prev,isValid: true}})

            break
        
          case 2:
              if (!skills.value.length){
                  setSkills(prev => {return {...prev, isEmpty: true}})
                  errors.push(skills.emptyErrorMsg)
                  isValid = false
              }

              else setSkills(prev => {return {...prev, isEmpty: false}})
            
              break

          case 3:
              if (experience.value?.length && experience.value.length < 100){
                    setExperience(prev => {return {...prev, isValid: false}})
                    errors.push(experience.errorMsg)
                    isValid = false
              }

              else setExperience(prev => {return {...prev, isValid: true}})
        }

        if (!isValid){
            setErrors(errors)
            window.scrollTo(0, 0)
            return
        }

        setErrors([])
        setCurrentTab(currentTab + 1)

        return isValid
    }

    function handleToPrevTab(){
        setErrors([])
        setCurrentTab(currentTab - 1)
    }

    function handleSetSkills(e: React.ChangeEvent<HTMLInputElement>){
        setSkills(prev => {return {...prev, currentVal: e.target.value}})
        e.target.value = e.target.value.replace(',','')
    }

    function handleSubmitForm(e: React.SyntheticEvent){
        e.preventDefault()

        if (!validateForm()) return
        const requestOptions = {
            headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
        }

        let form = new FormData();

        form.append('firstName',firstName.value)
        if (middleName.value) form.append('middleName',middleName?.value)
        form.append('lastName',lastName.value)
        form.append('phone',phone.value)
        form.append('about',about.value)

        if (cv.value)
           form.append('cv',cv.value,cv.name)
        
        if (logo.value)
           form.append('logo',logo.value,logo.name)
        
        form.append('skills',skills.value.toString())
        if (experience.value) form.append('experience',experience.value)
        form.append('education',education.value)
        form.append('industry',industry.value)
        form.append('distance',distance.value)

        if (edit){
            axios.put('/api/profile',form,requestOptions)
            .then(response => {
                 if (response.status === 200){
                    dispatch(setMessage('Profile is successfully saved'))
                    setTimeout(() => {
                        dispatch(setMessage(''))
                    },2000)
                    navigate(`/profile/${user.id}`)
                }
            })

            .catch(error => {
                if (error.response.status === 400) setErrors(['Something went wrong'])
            })
        }
        
        else{
            axios.post('/api/profile',form,requestOptions)
            .then(response => {
                if (response.status === 201){
                    dispatch(setMessage('Profile is successfully saved'))
                    setTimeout(() => {
                        dispatch(setMessage(''))
                    },2000)
                    navigate(`/profile/${user.id}`)
                    
                }
                
            })

            .catch(error => {
                if (error.response.status === 400) setErrors(['Something went wrong'])
            })
        }

        
    }

    return (
        <div>
            <div className = 'steps'>
                <span className = {`step ${currentTab === 1 ? 'active' : currentTab > 1 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(1) : null}><p className = 'step-label'>Personal Details</p></span>
                <span className = {`step ${currentTab === 2 ? 'active' : currentTab > 2 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(2) : null}><p className = 'step-label'>Skills</p></span>
                <span className = {`step ${currentTab === 3 ? 'active' : currentTab > 3 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(3) : null}><p className = 'step-label'>Work Experience</p></span>
                <span className = {`step ${currentTab === 4 ? 'active' : currentTab > 4 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(4) : null}><p className = 'step-label'>Education</p></span>
                <span className = {`step ${currentTab === 5 ? 'active' : currentTab > 5 ? 'finish' : null}`} onClick = {e => e.currentTarget.className === 'step finish' ? setCurrentTab(5) : null}><p className = 'step-label'>Preferences</p></span>
            </div>
            
            <form>
                <div className = {`tab ${currentTab === 1 ? 'show' : 'hide'}`}>
                  <h1 className = 'title'>Details</h1> 
                    <Errors errors = {errors}/>

                    <label htmlFor = 'firstName'><h3>First name:</h3></label>
                    <input id = 'firstName' value = {firstName.value} className = {!firstName.isValid ? 'inputError' : ''} onChange = {e => setFirstName(prev => {return {...prev, value: e.target.value}})} onKeyUp = {handleFixName} placeholder = 'First name...' autoComplete = 'on' required/>

                    <label htmlFor = 'middleName'><h3>Middle name (Optional):</h3></label>
                    <input id = 'middleName' value = {middleName.value} className = {!middleName.isValid ? 'inputError' : ''} onChange = {e => setMiddleName(prev => {return {...prev, value: e.target.value}})} placeholder = 'Middle name...' onKeyUp = {handleFixName} autoComplete = 'on'/>

                    <label htmlFor = 'lastName'><h3>Last name:</h3></label>
                    <input id = 'lastName' value = {lastName.value} className = {!lastName.isValid ? 'inputError' : ''}  onChange = {e => setLastName(prev => {return {...prev, value: e.target.value}})} placeholder = 'Last name...' onKeyUp = {handleFixName} autoComplete = 'on' required/>

                    <label htmlFor = 'phone'><h3>Phone number: (Only provided to employers)</h3></label>
                    <input id = 'phone' value = {phone.value} type = 'tel' className = {!phone.isValid ? 'inputError' : ''} onChange = {e => setPhone(prev => {return {...prev, value: e.target.value}})} placeholder = 'Phone number...' autoComplete = 'on' maxLength = {15} required/>

                    <label htmlFor = 'about' ><h3>About (Characters remaining: {about.maxLength - about.currentLength}):</h3></label>
                    <textarea id = 'about' value = {about.value} className = {!about.isValid ? 'inputError' : ''} onChange = {e => setAbout(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} placeholder = 'Tell us about yourself...' maxLength = {about.maxLength} style = {{height:'100px'}} required/>

                    <label htmlFor = 'logo'><h3>Profile logo (Optional):</h3></label>
                    <input id = 'logo' type = 'file' accept = 'image/*' autoComplete = 'on' onChange = {e => {if (!e.target.files) return; setLogo({value: e.target.files[0], name: e.target.files[0].name})}}/>
                    {edit && profile.values.logo ? <p>Current logo: {profile.values.logo}</p> : null} 

                </div>

                <div className = {`tab ${currentTab === 2 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Skills</h1> 
                    <Errors errors = {errors}/>

                    <label htmlFor = 'skills'><h3>Specific Key skills:</h3></label>
                    <input id = 'skills' className = {skills.alreadyExists || skills.isEmpty ? 'inputError' : ''} value = {skills.currentVal} onChange = {handleSetSkills} placeholder = 'E.g Good problem solving...' autoComplete = 'on' required/>
                    
                    <List name = 'Skills' 
                    state = {skills}
                    handleAdd = {() => setSkills(prev => ({...prev, value: [...prev.value, skills.currentVal]}))}
                    handleClearInput = {() => setSkills(prev => {return {...prev,currentVal: ''}})}
                    handleSetIsEmpty = {(empty = true) => setSkills(prev => {return{...prev,isEmpty: empty}})}
                    handleSetAlreadyExists = {(exists = true) => setSkills(prev => {return {...prev,alreadyExists: exists}})}
                    handleSetAll = {(newItems: Array<string>) => setSkills(prev => {return {...prev,value: newItems}})}
                    />
                </div>

                <div className = {`tab ${currentTab === 3 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Work Experience</h1> 
                    <Errors errors = {errors}/>
                    <label htmlFor = 'experience'><h3>Work Experience (Optional) Characters remaining: {experience.maxLength - experience.currentLength}</h3></label>
                    <textarea id = 'experience' value = {experience.value} className = {!experience.isValid ? 'inputError' : ''}   style = {{height: '200px'}} onChange = {e => setExperience(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} placeholder = 'Work experience...' autoComplete = 'on' maxLength = {experience.maxLength}/>
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
                        <option value = 'A-levels'>A-levels</option>
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
                    {edit && profile.values.cv ? <p>Current CV: {profile.values.cv}</p> : null} 

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
                
                {currentTab === maxTabs ? <button type = 'button' id = 'submit' onClick = {handleSubmitForm} >Submit</button> : <button type = 'button' className = 'toggleTabBtn' onClick = {validateForm} style = {{float:'right'}}>Next</button>}
                <button type = 'button' className = {currentTab > 1 ? 'toggleTabBtn' : 'hide'} onClick = {handleToPrevTab}>Previous</button>
            </form>

        </div>
    )
}
