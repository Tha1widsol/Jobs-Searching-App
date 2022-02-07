import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ProfileProps} from './types';
import './css/ProfilePage.css'
import {useAppDispatch} from '../../Global/features/hooks';
import {setMessage} from '../../Global/features/successMsg';
import axios from 'axios'

export default function ProfilePage() {
  let navigate = useNavigate()
  const token = localStorage.getItem('token')
  const dispatch = useAppDispatch()
  const [profile,setProfile] = useState<ProfileProps>({user: {email: '',isHired: null,isAnEmployer: null},
  firstName: '',lastName: '',middleName:'',skills: [],phone: '',logo: '',cv: '',education: '',industry: '',distance: '',experience: '',
  about: '', isActive: null})

  const [dropdown,setDropdown] = useState(false)

  useEffect(() => {
    axios.get('/api/profile',{headers: {Authorization: `Token ${token}`}})
    .then(response => {
      if (response.status === 200){
        const data = response.data
        setProfile(data)
      }
      
    })

    .catch(error => {
      if (error.response.status === 404) navigate('/create-profile')
    })
  },[token,navigate])

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

            setProfile(prev => {
            return {...prev, isActive: !prev.isActive}
          })
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
  <div> 
    <label><p id = 'status'>Status:</p></label>
    <div className = {profile.isActive ? 'public' : 'private'}></div>
  
    <div id = 'profileContainer'>
    <div onMouseEnter = {() => setDropdown(true)} onMouseLeave = {() => setDropdown(false)}>
      <div className = 'kebabMenuIcon'></div>
        <div className = 'profileDropdown'>
          {dropdown ? 
          <div className = 'profileDropdownContent'>
           {profile.isActive ? <button className = 'statusNavBtn' onClick = {() => handleToggleStatus()}>Set profile private</button> : <button className = 'statusNavBtn' onClick = {() => handleToggleStatus()}>Set profile public</button>} 
            <button className = 'editNavBtn'>Edit</button>
             <button className = 'deleteNavBtn' onClick = {() => handleDeleteProfile}>Delete</button>
          </div>

          : null}
         
        </div>
    </div>
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
                {profile.skills.map((skill,index) =>{
                  return (
                    <li key = {index}>{skill.name}</li>
                  )
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
  </div>
  
  )
      
}
