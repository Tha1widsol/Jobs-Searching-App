import React from 'react';
import './css/ProfilePage.css'
import Profile from '../Profile/Profile';
import {useAppSelector} from '../../Global/features/hooks';


export default function ProfilePage() {
  const profile = useAppSelector(state => state.profile.values)

  return (
  <div> 
    <label><p id = 'status'>Status:</p></label>
    <div className = {profile.isActive ? 'public' : 'private'}></div>
    <Profile userIsOnProfilePage = {true}/>
  </div>
  
  )
      
}
