import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ProfileProps} from './types';
import './css/ProfilePage.css'
import axios from 'axios'

export default function ProfilePage() {
  let navigate = useNavigate()
  const token = localStorage.getItem('token')

  const [profile,setProfile] = useState<ProfileProps>({user: {email: '',isHired: null,isAnEmployer: null},
  firstName: '',lastName: '',skills: [],phone: '',logo: '',cv: '',education: '',industry: '',distance: '',experience: '',
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
          setProfile(prev => {
            return {...prev, isActive: !prev.isActive}
          })
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
    <label><p style = {{textAlign:'center'}}>Status:</p></label>
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
        <p>{profile.firstName}</p>
    </div>
  </div>
  
  )
      
}
