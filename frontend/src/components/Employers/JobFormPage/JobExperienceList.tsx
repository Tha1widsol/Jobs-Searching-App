import React,{useState} from 'react'
import ReactScrollableFeed from 'react-scrollable-feed';
import { JobExperienceProps } from '../../../features/Employers/jobs/types/JobExperienceProps';
import JobExperienceForm  from './JobExperienceForm';
import { JobExperienceListProps } from '../../../features/Employers/jobs/jobExperience';
import { useAppSelector, useAppDispatch } from '../../../app/hooks';
import { fetchJobExperience } from '../../../features/Employers/jobs/jobExperience';
import { handleAddSuccessMsg } from '../../Global/messages/SuccessAlert';
import { deleteJobExperience } from '../../../features/Employers/jobs/jobExperience';
import { token } from '../../../features/Auth/user';
import Popup from '../../Global/Popup/Popup';
import axios from 'axios'

const initialExperience = {
    id: 0, experience: '', years: 0,  required: false
}
   

export default function JobExperienceList({experience, edit = true, popupOff}: {experience: JobExperienceListProps['values'], edit?: boolean, popupOff: () => void}) {
    const dispatch = useAppDispatch()
    const [popup, setPopup] = useState({experience: {trigger: false, values: initialExperience}, deleteExperience: {trigger: false, id: 0, experience: ''}})
    const user = useAppSelector(state => state.user.values)

    function handleRemoveExperience(id: number){
      const requestOptions = {
        headers: {'Content-Type': 'multipart/form-data', Authorization:`Token ${token}`}
      }
        axios.delete(`/api/job/experience?id=${id}`, requestOptions)
        .then(response => {
          if (response.status === 200){
              dispatch(deleteJobExperience(id))
              popupOff()
          }
        })
       
    } 
      
  return (
      <div className = 'list longerList'>
        <ReactScrollableFeed>
        {experience.slice(1).map((exp, index) => {
            return (
            <div key = {index}>
                <table style = {{marginTop: '20px'}}>
                <tbody>
                    <tr>
                    <th>No</th>
                    <th>Experience</th>
                    <th>Years</th>
                    <th>Required</th>
                    </tr>

                    <tr>
                    <td>{index + 1}</td>
                    <td>{exp.experience}</td>
                    <td>{exp.years}</td>
                    <td>{exp.required ? 'Yes' : 'No'}</td>
                    <td><span>&#9998;</span></td>
                    <td><span onClick = {() => handleRemoveExperience(exp.id)} className = 'cross'>X</span></td>
                    </tr>
                </tbody>
                </table>
                
                </div>
            )
        })}
        </ReactScrollableFeed>
    </div>
  )
}
