import React,{useState,useEffect} from 'react'
import './css/Profile.css'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks';
import {fetchProfile} from '../../Global/features/Jobseekers/Profile/profile';
import {setToggleStatus} from '../../Global/features/Jobseekers/Profile/profile'
import {setMessage} from '../../Global/features/successMsg';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

export default function Profile({userIsOnProfilePage = false} : {userIsOnProfilePage?: boolean}) {
    let navigate = useNavigate()
    const token = localStorage.getItem('token')
    const profile = useAppSelector(state => state.profile.values)
    const [dropdown,setDropdown] = useState(false)
    const profileDoesExist = sessionStorage.getItem('profileDoesExist')
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (profileDoesExist === 'false') navigate('/create-profile') 
        dispatch(fetchProfile())
    },[dispatch,navigate,profileDoesExist])

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
        {userIsOnProfilePage ? 
        <div onMouseEnter = {() => setDropdown(true)} onMouseLeave = {() => setDropdown(false)}>
            <div className = 'kebabMenuIcon'/>
                <div className = 'profileDropdown'>
                    {dropdown ? 
                    <div className = 'profileDropdownContent'>
                        {profile.isActive ? <button className = 'statusNavBtn' onClick = {() => handleToggleStatus()}>Set profile private</button> : <button className = 'statusNavBtn' onClick = {() => handleToggleStatus()}>Set profile public</button>} 
                            <button className = 'editNavBtn'>Edit</button>
                            <button className = 'deleteNavBtn' onClick = {() => handleDeleteProfile()}>Delete</button>
                    </div>

                    : null}
                
                </div>
        </div>
        
        : null}
      
            <section style = {{display:'flex'}}>
                <p className = 'fullName'>{profile.firstName} {profile.middleName} {profile.lastName}</p>
                {profile.logo ? <img className = 'logo' src = {profile.logo} alt = ''/> : null}
            </section>
        
            <p><i className = 'fa fa-phone icon'></i>000011111</p>
            <p><i className = 'icon'>&#9993;</i>{profile.user.email}</p>

            <section className = 'profileSection'>
                <section>
                    <label><h2>Skills</h2></label>
                    <hr className = 'mt-0-mb-4'/>
                    <div className = 'skills'>
                        {profile.skills.map((skill,index) => {
                            return (<li key = {index}>{skill.name}</li>)
                        })}
                    </div>
                </section>
                
                <section className = 'about'>
                    <label><h2>About</h2></label>
                    <hr className = 'mt-0-mb-4'/>
                    <p className = 'sectionText'>{profile.about}</p>
                </section>

            </section>

            <section className = 'profileSection'>
                <section className = 'experience'>
                    <label><h2>Experience</h2></label>
                    <hr className = 'mt-0-mb-4'/>
                    <p className = 'sectionText'>{profile.experience}</p>
                </section>

                <section className = 'education'>
                    <label><h2>Education</h2></label>
                    <hr className = 'mt-0-mb-4'/>
                    <p className = 'sectionText'>{profile.education}</p>
                </section>

            </section>

            {profile.cv ? 
            <section className = 'profileSection'>
                    <section className = 'cv'>
                    <label><h2>CV / Resume</h2></label>
                    <hr className = 'mt-0-mb-4'/>
                    <a href = {`http://localhost:8000${profile.cv}`} target = '_blank' rel = 'noopener noreferrer'><button>Preview</button></a> 
                    </section>

                    <section className = 'preferences'>
                        <label><h2>Preferences</h2></label>
                        <hr className = 'mt-0-mb-4'/>
                        <section style = {{width: '300px'}}>
                            <li>Prefered industry: Any</li>
                            <li>Prefered distance from workplace: {profile.distance}</li>
                        </section>
                    </section>
        
            </section>
            : null}

    
    </div>
  )
}
