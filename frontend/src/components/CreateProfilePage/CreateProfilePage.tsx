import React,{useState} from 'react'
import Errors from '../messages/Errors';
import Success from '../messages/Success';
import axios from 'axios'
import ReactScrollableFeed from 'react-scrollable-feed';
import {FieldProps,TextFieldProps,SkillsProps} from './types/CreateProfileInterface';

export default function CreateProfilePage() {
    const [currentTab,setCurrentTab] = useState(1)
    const [success,setSuccess] = useState('')
    const [errors,setErrors] = useState<Array<string>>([])

    const [firstName,setFirstName] = useState<FieldProps>({value: '', isValid: true, errorMsg: 'First name is invalid'})
    const [middleName,setMiddleName] = useState<FieldProps>({value: '', isValid: true, errorMsg: 'Middle name is invalid'})
    const [lastName,setLastName] = useState<FieldProps>({value: '', isValid: true, errorMsg: 'Last name is invalid'})
    const [phone,setPhone] = useState<FieldProps>({value: '', isValid: true, errorMsg: 'Phone number is invalid'})
    const [about,setAbout] = useState<TextFieldProps>({value: '', isValid: true, currentLength: 0, maxLength: 250, errorMsg: 'About section needs to have atleast 100 characters'})
    const [skills,setSkills] = useState<SkillsProps>({value: [], currentSkill: '',isEmpty: false, emptyErrorMsg: 'Invalid skill', alreadyExists: false, alreadyExistsMsg: 'Skill already exists',skillAddedMsg:'Skill added',skillRemovedMsg: 'Skill removed'})
    const [experience,setExperience] = useState<TextFieldProps>({value: '', isValid: true, errorMsg: 'Experience section is invalid',currentLength: 0, maxLength: 450})

    const maxTabs = document.querySelectorAll('.tab').length

    const validateForm = () => {
        let isValid = true
        let errors : Array<string> = []
        const letters = /^[A-Za-z]+$/
        const lettersAndSpaces = /^[a-zA-Z\s]*$/
        const numbers = /[0-9]/g
        const symbols = /[!£$%^&*()]/g

        switch(currentTab){
          case 1: 
            if (!firstName.value.match(letters)){
                setFirstName(prev => {return {...prev,isValid: false}})
                errors.push(firstName.errorMsg)
                isValid = false
            }
    
            else setFirstName(prev => {return {...prev,isValid: true}})
    
            if (middleName.value !== '' && !middleName.value.match(letters)){
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

            if (!phone.value.match(numbers)){
                setPhone(prev => {return {...prev, isValid: false}})
                errors.push(phone.errorMsg)
                isValid = false
            }

            if (about.value.length < 100){
                setAbout(prev => {return {...prev,isValid: false}})
                errors.push(about.errorMsg)
                isValid = false
            }
    
            else setAbout(prev => {return {...prev,isValid: true}})
    
            break
        }
    
        if (!isValid){
            setErrors(errors)
            window.scrollTo(0, 0)
            return
        }

        setErrors([])
        setCurrentTab(currentTab + 1)
    }

    function handleToPrevTab(){
        setErrors([])
        setCurrentTab(currentTab - 1)
    }

    function handleFixName(e:any){
        const spaceRegex = /\s/g  
        e.target.value = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);  
        e.target.value = e.target.value.replace(spaceRegex, '');
        e.target.value = e.target.value.charAt(0) + e.target.value.slice(1).toLowerCase()
    }

    function handleAddSkill(){
       const currentSkill = skills.currentSkill.trim()
       let errors:Array<string> = []

       if (currentSkill.match(/^ *$/)) {
        setSkills(prev => {return {...prev,isEmpty: true}})
        errors.push(skills.emptyErrorMsg)
       }

       else setSkills(prev => {return {...prev,isEmpty: false}})

       if (skills.value.filter(skill => skill === currentSkill).length > 0){
        setSkills(prev => {return {...prev,alreadyExists: true}})
        errors.push(skills.alreadyExistsMsg)
       }

       else setSkills(prev => {return {...prev,alreadyExists: false}})

       if (errors.length){
           setSuccess('')
           setErrors(errors)
           return
       }
       
       setSkills(prev => ({...prev, value: [...prev.value,currentSkill]}))
       setSuccess(skills.skillAddedMsg)
       setErrors([])
       setSkills(prev => {return {...prev,currentSkill: ''}})
    }

    function handleRemoveSkill(skill: string){
        const newSkills = [...skills.value]
        let index = newSkills.findIndex(obj => obj === skill)
        newSkills.splice(index,1)
        setSkills(prev => {return {...prev,value: newSkills}})
        setErrors([])
        setSuccess(skills.skillRemovedMsg)
    }

    return (
        <div>
            <div className = 'steps'>
                <span className = {`step ${currentTab === 1 ? 'active' : currentTab > 1 ? 'finish' : null}`} onClick = {(e: any) => e.target.className === 'step finish' ? setCurrentTab(1) : null}><p className = 'step-label'>Personal Details</p></span>
                <span className = {`step ${currentTab === 2 ? 'active' : currentTab > 2 ? 'finish' : null}`} onClick = {(e: any) => e.target.className === 'step finish' ? setCurrentTab(2) : null}><p className = 'step-label'>Skills</p></span>
                <span className = {`step ${currentTab === 3 ? 'active' : currentTab > 3 ? 'finish' : null}`} onClick = {(e: any) => e.target.className === 'step finish' ? setCurrentTab(3) : null}><p className = 'step-label'>Work Experience</p></span>
                <span className = {`step ${currentTab === 4 ? 'active' : currentTab > 4 ? 'finish' : null}`} onClick = {(e: any) => e.target.className === 'step finish' ? setCurrentTab(4) : null}><p className = 'step-label'>Education</p></span>
                <span className = {`step ${currentTab === 5 ? 'active' : currentTab > 5 ? 'finish' : null}`} onClick = {(e: any) => e.target.className === 'step finish' ? setCurrentTab(5) : null}><p className = 'step-label'>Preferences</p></span>
            </div>
            
            <form>
                <div className = {`tab ${currentTab === 1 ? 'show' : 'hide'}`}>
                  <h1 className = 'title'>Details</h1> 
                    <Errors errors = {errors}/>

                    <label htmlFor = 'firstName'><h3>First name:</h3></label>
                    <input id = 'firstName' className = {!firstName.isValid ? 'inputError' : ''} onChange = {e => setFirstName(prev => {return {...prev, value: e.target.value}})} onKeyUp = {handleFixName} placeholder = 'First name...' autoComplete = 'on' required/>

                    <label htmlFor = 'middleName'><h3>Middle name (Optional):</h3></label>
                    <input id = 'middleName' className = {!middleName.isValid ? 'inputError' : ''} onChange = {e => setMiddleName(prev => {return {...prev, value: e.target.value}})} placeholder = 'Middle name...' onKeyUp = {handleFixName} autoComplete = 'on'/>

                    <label htmlFor = 'lastName'><h3>Last name:</h3></label>
                    <input id = 'lastName' className = {!lastName.isValid ? 'inputError' : ''}  onChange = {e => setLastName(prev => {return {...prev, value: e.target.value}})} placeholder = 'Last name...' onKeyUp = {handleFixName} autoComplete = 'on' required/>

                    <label htmlFor = 'phone'><h3>Phone number: (Only provided to employers)</h3></label>
                    <input id = 'phone' type = 'tel' className = {!phone.isValid ? 'inputError' : ''} onChange = {e => setPhone(prev => {return {...prev, value: e.target.value}})} placeholder = 'Phone number...' autoComplete = 'on' maxLength = {15} required/>

                    <label htmlFor = 'about' ><h3>About (Characters remaining: {about.maxLength - about.currentLength}):</h3></label>
                    <textarea id = 'about' className = {!about.isValid ? 'inputError' : ''} onChange = {e => setAbout(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} placeholder = 'Tell us about yourself...' maxLength = {about.maxLength} style = {{height:'100px'}} required/>

                    <label htmlFor = 'logo'><h3>Profile logo (Optional):</h3></label>
                    <input id = 'logo' type = 'file' accept = 'image/*' autoComplete = 'on' required/>

                </div>

                <div className = {`tab ${currentTab === 2 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Skills</h1> 
                    <Success success = {success}/>
                    <Errors errors = {errors}/>

                    <label htmlFor = 'skills'><h3>Specific Key skills:</h3></label>
                    <input id = 'skills' className = {skills.alreadyExists || skills.isEmpty ? 'inputError' : ''} value = {skills.currentSkill} onChange = {e => setSkills(prev => {return {...prev, currentSkill: e.target.value}})} placeholder = 'E.g Good problem solving...' autoComplete = 'on' required/>
                    <button type = 'button' style = {{marginTop:'10px'}} onClick = {handleAddSkill}>Add skill</button>

                    {skills.value.length ? <p>Your skills ({skills.value.length}):</p> : null}
                    <div className = 'list'>
                        <ReactScrollableFeed>
                        {skills.value.map((skill,index) => {
                            return (
                            <div key = {index} style = {{display:'flex',justifyContent:'space-between'}}>
                               <li>{skill}</li>
                               <button type = 'button' onClick = {() => handleRemoveSkill(skill)} style = {{padding:'10px'}}>Remove</button>
                            </div>
                            )
                        
                        })}
                        </ReactScrollableFeed>
                    </div>
                </div>

                <div className = {`tab ${currentTab === 3 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Work Experience</h1> 
                    <Errors errors = {errors}/>
                    <label htmlFor = 'experience'><h3>Work Experience (Optional) Characters remaining: {experience.maxLength - experience.currentLength}</h3></label>
                    <textarea id = 'experience' className = {!experience.isValid ? 'inputError' : ''}   style = {{height: '200px'}} onChange = {e => setExperience(prev => {return {...prev,currentLength: e.target.value.length, value: e.target.value}})} placeholder = 'Work experience...' autoComplete = 'on' maxLength = {experience.maxLength}/>

                </div>

                <div className = {`tab ${currentTab === 4 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Education</h1> 
                    <Errors errors = {errors}/>
                </div>

                <div className = {`tab ${currentTab === 5 ? 'show' : 'hide'}`}>
                    <h1 className = 'title'>Preferences</h1> 
                    <Errors errors = {errors}/>
                </div>
                
                {currentTab === maxTabs ? <button id = 'submit'>Submit</button> : <button type = 'button' className = 'toggleTabBtn' onClick = {() => setCurrentTab(currentTab + 1)} style = {{float:'right'}}>Next</button>}
                <button type = 'button' className = {currentTab > 1 ? 'toggleTabBtn' : 'hide'} onClick = {handleToPrevTab}>Previous</button>
            </form>

        </div>
    )
}
