import React from 'react'
import Popup from '../../../Global/Popup/Popup'
import ProfileSkillsForm from './ProfileSkillsForm'

export default function ProfileSkillsPopup({popupOn, switchOff}: {popupOn: boolean, switchOff: () => void}) {

  return (
    <Popup trigger = {popupOn} switchOff = {switchOff} modalOn = {false}>
        <div style = {{minWidth: '300px'}}>
            <ProfileSkillsForm edit = {true} popupOff = {switchOff} toggleTab = {() => null}/>
            <button type = 'button' style = {{float: 'left'}} onClick = {switchOff}>Cancel</button>
        </div>
    </Popup>
  )
}
