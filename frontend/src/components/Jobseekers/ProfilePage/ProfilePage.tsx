import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ProfileProps} from './types';
import './css/ProfilePage.css'
import axios from 'axios'

export default function ProfilePage() {
  let navigate = useNavigate()
  const [profile,setProfile] = useState<ProfileProps>({user: {email: '',isHired: null,isAnEmployer: null},
firstName: '',lastName: '',skills: [],phone: '',logo: '',cv: '',education: '',industry: '',distance: '',experience: '',
about: '', isActive: null})

  const [dropdown,setDropdown] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const requestOptions = {
      headers: {'Content-Type': 'application/json', Authorization: `Token ${token}`}
    }
    axios.get('/api/profile',requestOptions)
    .then(response => {
      if (response.status === 200){
        const data = response.data
        setProfile(data)
      }
      
    })

    .catch(error => {
      if (error.response.status === 404) {
          navigate('/create-profile')
      }

    })
  },[navigate])

  function handleToggleStatus(){

    setProfile(prev => {
      return {...prev, isActive: !prev.isActive}
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
          <div className = 'profileDropdown-Content'>
           {profile.isActive ? <button className = 'status' onClick = {() => handleToggleStatus()}>Set profile private</button> : <button className = 'status' onClick = {() => handleToggleStatus()}>Set profile public</button>} 
            <button className = 'edit'>Edit</button>
             <button className = 'delete'>Delete</button>
          </div>

          : null}
         
        </div>
    </div>

  
    
        <p>fds</p>
    </div>
  </div>
  
  )
      
}
