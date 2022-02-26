import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {AuthProps} from './types'
import axios from 'axios'

const token = localStorage.getItem('token')

const initialState: AuthProps = {values: {
    id: null,
    email: '', 
    isHired: null,
    isAnEmployer: null
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
            localStorage.removeItem('token')
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

