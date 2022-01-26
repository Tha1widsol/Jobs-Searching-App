import React,{useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

export default function JobSeekersHomePage() {
  let navigate = useNavigate()
  const token = localStorage.getItem('token')

  useEffect(() => {
      const requestOptions = { 
        headers:{'Content-Type':'application/json', Authorization:`Token ${token}`}
      }
    
      axios.get('/api/profile',requestOptions)
     .catch(error => {
          navigate('/create-profile')
     })
      
  },[token,navigate])

  return (
    <div>
        <h1>Job seekers page</h1>
    </div>
  )
}
