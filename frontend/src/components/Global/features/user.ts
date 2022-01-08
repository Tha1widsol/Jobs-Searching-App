import {createSlice} from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name : 'user',
    initialState:  {id: null, email: null, hired: null, is_an_employer: null,logged_in: localStorage.getItem('token') ? true : false},
    reducers: {
        login: (state,action) => {
            state = action.payload
        },

        logout: (state) => {
            localStorage.removeItem('token');
            state = {id: null, email: null, hired: null, is_an_employer: null,logged_in: false}
        }
    }
})

export const { login,logout } = userSlice.actions

export default userSlice.reducer

