import React,{useEffect} from 'react'
import { useAppSelector, useAppDispatch } from '../../../Global/features/hooks';
import { fetchProfileExperience } from '../../../Global/features/Jobseekers/profiles/profileExperience';
import { fetchProfile } from '../../../Global/features/Jobseekers/profiles/profile';
import { DeleteProfileExperience } from '../../../Global/features/Jobseekers/profiles/profileExperience';
import ReactScrollableFeed from 'react-scrollable-feed';

export default function ProfileExperienceListForm() {
    const dispatch = useAppDispatch()
    const user = useAppSelector(state => state.user)
    const profile = useAppSelector(state => state.profile)
    const experience = useAppSelector(state => state.profileExperience)

    useEffect(() => {
        dispatch(fetchProfile(user.values?.id))
        dispatch(fetchProfileExperience(profile.values?.id))
    },[dispatch, user.values?.id, profile.values?.id])

    function handleRemoveExperience(idx: number){
        const newExperience = [...experience.values]
        newExperience.splice(idx, 1)
        dispatch(DeleteProfileExperience(idx))
    } 
    
  return (
    <>
        {experience.values.length ? <label><h2>Experience: ({experience.values.length})</h2></label>: null}
        <div className = 'list longerList'>
            <ReactScrollableFeed>
            {experience.values?.map((exp, index) => {
                    return (
                        <div key = {index}>
                            <div style = {{display: 'flex', alignItems: 'center', gap: '20px'}}>
                            <h2>{exp.title}</h2>
                            <span>&#9998;</span>
                           <i className = 'fa fa-trash-o'/>

                            </div>
                            <p>{exp.EmployerName}</p>
                            <p style = {{fontSize: 'small', color: 'gray'}}>Years worked - {exp.years}</p>

                            <p>{exp.description}</p>
                            <p>Still working this job - {exp.isOnGoing ? 'Yes' : 'No'}</p>
                            
                            {exp.EmployerEmail || exp.EmployerPhone ? 
                            <div>
                                <label><h3>Reference</h3></label>
                                <ul>
                                    {exp.EmployerEmail ? <li>Employer's Email - {exp.EmployerEmail}</li> : null}
                                    {exp.EmployerPhone ? <li>Employer's Phone - {exp.EmployerPhone}</li> : null}
                                </ul>
                            </div>
                            : null}
                            
                            <hr className = 'mt-0-mb-4'/>

                        </div>
                    )
            })}
            </ReactScrollableFeed>
        </div>
    </>
  )
}
