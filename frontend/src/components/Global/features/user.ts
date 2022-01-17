import {createSlice} from '@reduxjs/toolkit'

interface UserProps {
    id: number | null
    email: string | null
    hired: boolean | null
    isAnEmployer: boolean | null
    loggedIn: boolean | null
}

const initialStateValues: UserProps = {id: null, email: null, hired: null, isAnEmployer: null,loggedIn: false}

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

