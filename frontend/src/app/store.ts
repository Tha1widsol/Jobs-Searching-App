import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux"
import userReducer from '../features/Auth/user'
import ProfileReducer from '../features/Jobseekers/profiles/profile'
import ProfilesReducer from '../features/Jobseekers/profiles/profiles'
import successMsgReducer from '../features/successMsg'
import CompaniesReducer from '../features/Employers/companies/companies'
import CompanyReducer from '../features/Employers/companies/company'
import JobsReducer from '../features/Employers/jobs/jobs'
import homePageJobsReducer from '../features/Public/homePageJobs'
import JobReducer from '../features/Employers/jobs/job'
import ApplicationsReducer from '../features/Jobseekers/applications/applications'
import ApplicationReducer from '../features/Jobseekers/applications/application'
import checkApplicationExistsReducer from '../features/Jobseekers/applications/checkApplicationExists'
import savedJobsReducer from '../features/Jobseekers/savedJobs/savedJobs'
import matchingJobsReducer from '../features/Jobseekers/matchingJobs/matchingJobs'
import jobExperienceReducer from '../features/Employers/jobs/jobExperience'
import profileExperienceReducer from '../features/Jobseekers/profiles/profileExperience'
import currentCompanyReducer from '../features/Employers/companies/currentCompany'
import profileEducationReducer from '../features/Jobseekers/profiles/profileEducation'
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
  profileEducation: profileEducationReducer,
  company: CompanyReducer,
  companies: CompaniesReducer, 
  currentCompany: currentCompanyReducer,
  jobs: JobsReducer,
  homePageJobs: homePageJobsReducer,
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