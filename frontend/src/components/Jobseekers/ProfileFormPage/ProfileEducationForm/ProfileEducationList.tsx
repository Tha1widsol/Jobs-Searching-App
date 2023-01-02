import React from 'react'
import { ProfileEducationListProps } from '../../../Global/features/Jobseekers/profiles/profileEducation'

export default function ProfileEducationList({education, allowEdit = true} : {education: ProfileEducationListProps, allowEdit?: boolean}) {
  return education.status === 'success' ? (
    <>
      {education.values?.map(education => {
        return (
          <div key = {education.id}>
              <p>{education.education}</p>
              <p>{education.field}</p>
              <hr className = 'mt-0-mb-4'/>
          </div>
        )
      })}
    </>
  ) 
  : education.status === 'loading' ? <p>Loading</p>
  : null
}
