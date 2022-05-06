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
import storage from 'redux-persist/lib/storage'

import {
  persistReducer
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  version: 1,
  blacklist: ['successMsg'],
  storage,
}

const reducers = combineReducers({
  user: userReducer,
  successMsg: successMsgReducer,
  profile: ProfileReducer,
  profiles: ProfilesReducer,
  company: CompanyReducer,
  companies: CompaniesReducer, 
  jobs: JobsReducer,
  job: JobReducer,
  applications: ApplicationsReducer,
  application: ApplicationReducer
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