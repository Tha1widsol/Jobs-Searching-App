import {configureStore} from '@reduxjs/toolkit'
import userReducer from './Auth/user'
import ProfileReducer from './Jobseekers/Profile/profile'
import EmployerReducer from './Employers/EmployersPage/employer'
import successMsgReducer from './successMsg'

export const store = configureStore({
  reducer: {
    user: userReducer,
    successMsg: successMsgReducer,
    profile: ProfileReducer,
    employer: EmployerReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch