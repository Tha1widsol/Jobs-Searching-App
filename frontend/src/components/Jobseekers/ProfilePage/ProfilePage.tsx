import React,{useEffect} from 'react';
import './css/ProfilePage.css'
import Profile from '../Profile/Profile';
import {useParams} from 'react-router-dom';
import {fetchProfile} from '../../Global/features/Jobseekers/profiles/profile';
import {fetchProfileExperience} from '../../Global/features/Jobseekers/profiles/profileExperience';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks';
import {useNavigate} from 'react-router-dom';

export default function ProfilePage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.profile)
  const user = useAppSelector(state => state.user.values)
  const {userID} = useParams()

  useEffect(() => {
    dispatch(fetchProfile(Number(userID)))
    .unwrap()
    .then(() => {
       if (profile.values.user.id === user.id)
          navigate(`/profile/${user.id}`)
    })

    .catch(() => {
      navigate('/create-profile')
    })
    
    dispatch(fetchProfileExperience(Number(userID)))
    
 },[dispatch, navigate, profile.values?.user.id, user.id, userID])

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
