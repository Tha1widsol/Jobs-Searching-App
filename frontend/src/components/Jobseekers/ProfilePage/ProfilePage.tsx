import React,{useEffect} from 'react';
import './css/ProfilePage.css'
import Profile from '../Profile/Profile';
import {useParams} from 'react-router-dom';
import {fetchProfile} from '../../Global/features/Jobseekers/profiles/profile';
import {fetchProfileExperience} from '../../Global/features/Jobseekers/profiles/profileExperience';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks';
import { fetchProfileEducation } from '../../Global/features/Jobseekers/profiles/profileEducation';
import {useNavigate} from 'react-router-dom';
import axios from 'axios'

export default function ProfilePage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.profile)
  const user = useAppSelector(state => state.user.values)
  const {userID} = useParams()

  useEffect(() => {
    axios.get(`/api/checkProfileExists?id=${userID}`)
    .then(response => {
      const data = response.data
      if (data.exists){
          dispatch(fetchProfile(Number(userID)))
          .then(() => {
            if (profile.values.user.id === user.id)
                navigate(`/profile/${user.id}`)
          })
          dispatch(fetchProfileExperience(Number(userID)))
          dispatch(fetchProfileEducation(Number(userID)))
      }

      else navigate('/create-profile')
    })
 },[dispatch, navigate, userID])

  return (
  <div> 
    {!user.isAnEmployer ?  
    <div className = 'status'>
        <label><p style = {{marginRight: '5px', fontSize: 'large'}}>Status:</p></label>
        <div className = {profile.values.isActive ? 'indicator green' : 'indicator red'}/>
    </div>
    : null}

    <Profile profile = {profile}/>
  </div>
  
  )
      
}
