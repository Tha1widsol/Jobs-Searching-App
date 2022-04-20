import React from 'react'
import './css/Popup.css'

export default function Popup({
    heading, 
    subheading = '(This action cannot be undone)',
    popup, 
    setPopupOff, 
    submitFunction
    }: 
    {
    heading: string, 
    subheading?: string, 
    popup: boolean, 
    setPopupOff: () => void, 
    submitFunction: () => void}) {
        
  return (
      <div>
          {popup ? 
          <div className = 'modalBackground'>
                <div className = 'popup'>
                    <div className = 'close' onClick = {setPopupOff}>&times;</div>
                    <p>{heading}</p>
                    <p style = {{fontSize: 'small'}}>{subheading}</p>
                    <button onClick = {submitFunction}>Confirm</button>
                    <button onClick = {setPopupOff}>Cancel</button>
                </div>
          </div>
        : null}
      </div>
  )
}
