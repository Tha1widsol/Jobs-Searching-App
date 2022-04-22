import React,{ReactNode} from 'react'
import './css/Popup.css'

export default function Popup({
    children,
    trigger,
    switchOff
    }: 
    {
    trigger: boolean, 
    switchOff: () => void
    children: unknown}
    ){
      
  return trigger ? (
      <div className = 'modalBackground'>
          <div className = 'popup'>
              <div className = 'close' onClick = {switchOff}>&times;</div>
              {children}
              <button onClick = {switchOff}>Cancel</button>
          </div>
      </div>
  ): null
}
