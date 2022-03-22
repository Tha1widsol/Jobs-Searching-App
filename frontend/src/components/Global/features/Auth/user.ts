import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import storage from 'redux-persist/lib/storage'

const token = localStorage.getItem('token')

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

export const {login,logout} = userSlice.actions

export default userSlice.reducer

