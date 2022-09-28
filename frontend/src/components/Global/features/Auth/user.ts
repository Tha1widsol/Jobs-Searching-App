import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import storage from 'redux-persist/lib/storage'

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
    isLoggedIn: token ? true : false, 
    status: ''
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
     async () => {
        if (!token) return
        try{
            const response = await axios.get('/api/user',{
                headers: {
                    Authorization:`Token ${token}`
                }
            })
    
            return response.data
        }

      catch(error){
          localStorage.removeItem('token');
          window.location.reload()
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
            storage.removeItem('token')
            state = initialState;
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

export const {login,logout} = userSlice.actions

export default userSlice.reducer

