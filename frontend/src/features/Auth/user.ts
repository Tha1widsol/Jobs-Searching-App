import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

export const token = localStorage.getItem('token')

export interface UserProps{
    id: number
    email: string
    isHired: boolean
    isAnEmployer: boolean
}

export const user: UserProps = {
    id: 0,
    email: '',
    isHired: false, 
    isAnEmployer: false
}

const initialState = {values: {
    id: 0,
    email: '', 
    isHired: false,
    isAnEmployer: false
    },
    isLoggedIn: false, 
    status: ''
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
     async () => {
        try{
            const {data} = await axios.get('auth/user')
            console.log("fsf", data)
            return data
        }

      catch(error){
          console.log(error)
      }
    }

)

export const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers: {
        login: (state) => {
            state.isLoggedIn = true
        },

        logout: (state) => {
            state.isLoggedIn = false
            state = initialState;
        },

        setUser: (state, action) => {
            state.values = action.payload
        }
    },

    extraReducers(builder){
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchUser.rejected, (state) => {
                state.status = 'rejected'
            })
    }


})

export const {login,logout, setUser} = userSlice.actions

export default userSlice.reducer

