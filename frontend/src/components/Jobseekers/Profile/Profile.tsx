import React,{useState} from 'react'
import './css/Profile.css'
import {useAppDispatch, useAppSelector} from '../../Global/features/hooks';
import {ProfileProps,setToggleStatus} from '../../Global/features/Jobseekers/profiles/profile'
import {setMessage} from '../../Global/features/successMsg';
import {useNavigate} from 'react-router-dom';
import {token} from '../../Global/features/Auth/user';
import axios from 'axios'

export default function Profile({profile} : {profile: ProfileProps}) {
    let navigate = useNavigate()
    const user = useAppSelector(state => state.user.values)
    const [dropdown,setDropdown] = useState(false)
    const dispatch = useAppDispatch()

    function handleToggleStatus(){
        axios.put('/api/toggleProfileStatus',null,{headers: {Authorization: `Token ${token}`}})
        .then(response => {
        if (response.status === 200){
            const message = response.data
            dispatch(setMessage(message.success))
            window.scrollTo(0, 0)
            setTimeout(() => {
                dispatch(setMessage(''))
            },2000)

            dispatch(setToggleStatus())
            setDropdown(false)
            }
        })
    }

    function handleDeleteProfile(){
        axios.delete('/api/profile',{headers: {Authorization: `Token ${token}`}})
        .then(response => {
        if (response.status === 200) navigate('/create-profile')
        })
    }

  return (
    <div id = 'profileContainer'>
        {!user.isAnEmployer ? 
        <section onMouseEnter = {() => setDropdown(true)} onMouseLeave = {() => setDropdown(false)}>
            {!user.isAnEmployer ? <div className = 'kebabMenuIcon'/> : null}
                <div className = 'containerDropdown'>
                    {dropdown ? 
                    <div className = 'containerDropdownContent'>
                        {profile.values.isActive ? <button className = 'dropdownBtn' onClick = {() => handleToggleStatus()}>Set profile private</button> : <button className = 'dropdownBtn' onClick = {() => handleToggleStatus()}>Set profile public</button>} 
                            <button className = 'dropdownBtn' onClick = {() => navigate('/edit-profile')} >Edit</button>
                            <button className = 'deleteNavBtn' onClick = {() => handleDeleteProfile()}>Delete</button>
                    </div>

                    : null}
                
                </div>
        </section>
        
        : null}
         <p className = 'fullName'>{profile.values.firstName} {profile.values.middleName} {profile.values.lastName}</p>
            <section style = {{display:'flex'}}>
                {profile.values.logo ? <img className = 'logo' src = {profile.values.logo} alt = ''/> : null}
                <div className = {profile.values.logo ? 'contact' : ''}> 
                    <p><i className = 'fa fa-phone icon'></i>000011111</p>
                    <p><i className = 'icon'>&#9993;</i>{profile.values.user.email}</p>
                </div>
            </section>
        
            <section className = 'profileSection'>
                <section>
                    <label><h2>Skills</h2></label>
                    <hr className = 'mt-0-mb-4'/>
                    <div className = 'listContainer'>
                        {profile.values.skills.map((skill,index) => {
                            return (<li key = {index}>{skill.name}</li>)
                        })}
                    </div>
                </section>
                
                <section className = 'about'>
                    <label><h2>About</h2></label>
                    <hr className = 'mt-0-mb-4'/>
                    <p className = 'sectionText'>{profile.values.about}</p>
                </section>

            </section>

            <section className = 'profileSection'>
                <section className = 'experience'>
                    <label><h2>Experience</h2></label>
                    <hr className = 'mt-0-mb-4'/>
                    <p className = 'sectionText'>{profile.values.experience}</p>
                </section>

                <section className = 'education'>
                    <label><h2>Education</h2></label>
                    <hr className = 'mt-0-mb-4'/>
                    <p className = 'sectionText'>{profile.values.education}</p>
                </section>

            </section>

            {profile.values.cv ? 
            <section className = 'profileSection'>
                    <section className = 'cv'>
                    <label><h2>CV / Resume</h2></label>
                    <hr className = 'mt-0-mb-4'/>
                    <a href = {`http://localhost:8000${profile.values.cv}`} target = '_blank' rel = 'noopener noreferrer'><button>Preview</button></a> 
                    </section>

                    <section className = 'preferences'>
                        <label><h2>Preferences</h2></label>
                        <hr className = 'mt-0-mb-4'/>
                        <section style = {{width: '300px'}}>
                            <li>Prefered industry: Any</li>
                            <li>Prefered distance from workplace: {profile.values.distance}</li>
                        </section>
                    </section>
        
            </section>
            : null}

    
    </div>
  )
}
