import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux"
import userReducer from './Auth/user'
import ProfileReducer from './Jobseekers/profiles/profile'
import ProfilesReducer from './Jobseekers/profiles/profiles'
import successMsgReducer from './successMsg'
import CompaniesReducer from './Employers/companies/companies'
import CompanyReducer from './Employers/companies/company'
import JobsReducer from './Employers/jobs/jobs'
import JobReducer from './Employers/jobs/job'
import ApplicationsReducer from './Jobseekers/applications/applications'
import ApplicationReducer from './Jobseekers/applications/application'
import checkApplicationExistsReducer from './Jobseekers/applications/checkApplicationExists'
import savedJobsReducer from './Jobseekers/savedJobs/savedJobs'
import matchingJobsReducer from './Jobseekers/matchingJobs/matchingJobs'
import jobExperienceReducer from './Employers/jobs/jobExperience'
import profileExperienceReducer from './Jobseekers/profiles/profileExperience'
import currentCompanyReducer from './Employers/companies/currentCompany'
import storage from 'redux-persist/lib/storage'

import {
  persistReducer
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  whitelist: ['user'],
  storage,
}

const reducers = combineReducers({
  user: userReducer,
  successMsg: successMsgReducer,
  profile: ProfileReducer,
  profiles: ProfilesReducer,
  profileExperience: profileExperienceReducer,
  company: CompanyReducer,
  companies: CompaniesReducer, 
  currentCompany: currentCompanyReducer,
  jobs: JobsReducer,
  job: JobReducer,
  jobExperience: jobExperienceReducer,
  applications: ApplicationsReducer,
  application: ApplicationReducer,
  checkApplicationExists: checkApplicationExistsReducer,
  savedJobs: savedJobsReducer,
  matchingJobs: matchingJobsReducer
 })

 const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false

  }),

})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch