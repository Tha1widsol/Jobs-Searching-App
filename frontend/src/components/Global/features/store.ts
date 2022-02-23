import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Auth/user'
import ProfileReducer from './Jobseekers/Profile/profile'
import successMsgReducer from './successMsg'
import CompaniesReducer from './Employers/Companies/companies'

export const store = configureStore({
  reducer: {
    user: userReducer,
    successMsg: successMsgReducer,
    profile: ProfileReducer,
    companies: CompaniesReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch