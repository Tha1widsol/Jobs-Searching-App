import {createSlice} from '@reduxjs/toolkit'

const initialStateValues = {id: null, email: null, hired: null, is_an_employer: null,logged_in: false}

export const userSlice = createSlice({
    name : 'user',
    initialState: {values: initialStateValues},
    reducers: {
        login: (state,action) => {
            state.values = action.payload
        },

        logout: (state) => {
            state.values = initialStateValues
            localStorage.removeItem('token');
        }
    }
})

export const { login,logout } = userSlice.actions

export default userSlice.reducer

