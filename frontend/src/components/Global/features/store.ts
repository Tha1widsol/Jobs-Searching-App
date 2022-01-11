import {configureStore} from '@reduxjs/toolkit'
import userReducer from './user'
import dropdownReducer from './dropdown'

export const store = configureStore({
  reducer: {
    user: userReducer,
    dropdown: dropdownReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch