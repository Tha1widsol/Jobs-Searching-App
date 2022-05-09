import React,{useState} from 'react'
import './css/Profile.css'
import {useAppDispatch, useAppSelector} from '../../Global/features/hooks';
import {ProfileProps,setToggleStatus,setDeleteProfile} from '../../Global/features/Jobseekers/profiles/profile'
import KebabMenu from '../../Global/KebabMenu/KebabMenu';
import {useNavigate} from 'react-router-dom';
import {handleAddSuccessMsg} from '../../Global/messages/SuccessAlert';
import {token} from '../../Global/features/Auth/user';
import Popup from '../../Global/Popup/Popup';
import axios from 'axios'

export default function Profile({profile} : {profile: ProfileProps}) {
    const navigate = useNavigate()
    const user = useAppSelector(state => state.user.values)
    const [popup,setPopup] = useState(false)
    const [dropdown,setDropdown] = useState(false)
    const dispatch = useAppDispatch()

    function handleToggleStatus(){
        axios.put('/api/toggleProfileStatus',null,{headers: {Authorization: `Token ${token}`}})
        .then(response => {
        if (response.status === 200){
            const message = response.data
            handleAddSuccessMsg(message.success, dispatch)
            dispatch(setToggleStatus())
            setDropdown(false)
            }
        })
    }

    function handleDeleteProfile(){
        axios.delete('/api/profile',{headers: {Authorization: `Token ${token}`}})
        .then(response => {
        if (response.status === 200){
            dispatch(setDeleteProfile())
            navigate('/create-profile')
            handleAddSuccessMsg('Profile is successfully removed', dispatch)
        } 

      })
    }

  return (
    <div id = 'profileContainer'>
        <Popup trigger = {popup} switchOff = {() => setPopup(false)}>
         <p>Are you sure you want to remove your profile?</p>
         <p style = {{fontSize: 'small'}}>(This action cannot be undone)</p>
         <button onClick = {handleDeleteProfile}>Confirm</button>
         </Popup>

        {!user?.isAnEmployer ? 
        <KebabMenu current = {dropdown} switchOn = {() => setDropdown(true)} switchOff = {() => setDropdown(false)}>
            {profile.values.isActive ? <button className = 'dropdownBtn' onClick = {() => handleToggleStatus()}>Set profile private</button> : <button className = 'dropdownBtn' onClick = {() => handleToggleStatus()}>Set profile public</button>} 
            <button className = 'dropdownBtn' onClick = {() => navigate('/edit-profile')} >Edit</button>
            <button className = 'deleteNavBtn' onClick = {() => setPopup(true)}>Delete</button>
        </KebabMenu>
        : null}

         <p className = 'fullName'>{profile.values.firstName} {profile.values.middleName} {profile.values.lastName}</p>
            <section style = {{display:'flex'}}>
                {profile.values.logo ? <img className = 'logo' src = {profile.values.logo} alt = ''/> : null}
                <div className = {profile.values.logo ? 'contact' : ''}> 
                    <p><i className = 'fa fa-phone icon'></i>000011111</p>
                    <p><i className = 'icon'>&#9993;</i>example@gmail.com</p>
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
