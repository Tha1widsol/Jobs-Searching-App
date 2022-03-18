import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux"
import userReducer from './Auth/user'
import ProfileReducer from './Jobseekers/profile'
import successMsgReducer from './successMsg'
import CompaniesReducer from './Employers/companies'
import CompanyReducer from './Employers/company'
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
  company: CompanyReducer,
  companies: CompaniesReducer, 
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