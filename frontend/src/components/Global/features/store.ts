import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user'
import successMsgReducer from './successMsg'

export const store = configureStore({
  reducer: {
    user: userReducer,
    successMsg: successMsgReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch