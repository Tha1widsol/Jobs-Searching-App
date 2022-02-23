import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {AuthProps} from './types'
import axios from 'axios'

const token = localStorage.getItem('token')
const email = sessionStorage.getItem('email')
const isAnEmployer = localStorage.getItem('isAnEmployer')

const initialState: AuthProps = {values: {
    id: null,
    email: email, 
    isHired: null,
    isAnEmployer: isAnEmployer === 'true' ? true : isAnEmployer === 'false' ? false : null
    },
    isLoggedIn: token ? true : false, 
    status: ''
}

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async () => {
        if (!token) return
        try{
            const response = await axios.get('/api/currentUser',{
                headers: {
                    Authorization:`Token ${token}`
                }
            })
            sessionStorage.setItem('email', response.data.email)
            localStorage.setItem('isAnEmployer', response.data.isAnEmployer)
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
        logout: (state) => {
            state = initialState
            localStorage.removeItem('token');
            sessionStorage.removeItem('email')
            localStorage.removeItem('isAnEmployer')
        }
    },

    extraReducers: {
        [fetchUser.pending.toString()]: (state) => {
            state.status = 'loading'
        },
        
        [fetchUser.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchUser.rejected.toString()]: (state) => {
            state.status = 'rejected'
        }
    }

})

export const {logout} = userSlice.actions

export default userSlice.reducer

