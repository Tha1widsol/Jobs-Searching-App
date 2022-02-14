import React,{useEffect} from 'react'
import {fetchEmployer} from '../../Global/features/Employers/EmployersPage/employer'
import {useAppSelector,useAppDispatch} from '../../Global/features/hooks'

export default function EmployerPage() {
  const dispatch = useAppDispatch()
  const employer = useAppSelector(state => state.employer.values)

  useEffect(() => {
    dispatch(fetchEmployer())
  },[dispatch])

  return (
    <div>
        <h1>{employer.lastName}</h1>
    </div>
  )
}
