import React,{useEffect} from 'react'
import {useAppSelector,useAppDispatch} from '../Global/features/hooks'
import {fetchJobs} from '../Global/features/Employers/jobs'

export default function JobsPage() {
  const dispatch = useAppDispatch()
  const jobs = useAppSelector(state => state.jobs)

  useEffect(() => {
    dispatch(fetchJobs())
  },[dispatch])

  return (
    <div>
       {jobs.values?.map((job,index) => {
           return (
               <p key = {index}>{job.title}</p>
           )
       })}
    </div>
  )
}
