import React,{useEffect} from 'react';
import './css/ProfilePage.css'
import Profile from '../Profile/Profile';
import {useParams} from 'react-router-dom';
import {fetchProfile} from '../../Global/features/Jobseekers/Profile/profile';
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks';
import {useNavigate} from 'react-router-dom';

export default function ProfilePage() {
  let navigate = useNavigate()
  const dispatch = useAppDispatch()
  const profile = useAppSelector(state => state.profile)
  const {userID} = useParams()

  useEffect(() => {
    dispatch(fetchProfile(userID)).then((response: any) => {
      if (response.error) navigate('/create-profile')
    })
 },[dispatch,navigate,userID])

  return (
  <div> 
    <label><p id = 'status'>Status:</p></label>
    <div className = {profile.values.isActive ? 'public' : 'private'}></div>
    <Profile profile = {profile} userIsOnProfilePage = {true}/>
  </div>
  
  )
      
}
