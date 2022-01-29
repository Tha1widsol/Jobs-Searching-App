import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

interface UserProps {
    user: {id: number | null
        email: string | null
        hired: boolean | null
        isAnEmployer: boolean | null}

    loggedIn: boolean | null
    loading: boolean
    error: any
}

const token = localStorage.getItem('token')
const initialState: UserProps = {user: {id: null, email: null, hired: null, isAnEmployer: null},loggedIn: token ? true : false, loading: false, error: null}

export const fetchUser:any = createAsyncThunk(
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
        [fetchUser.pending]: (state) => {
            state.loading = true
            state.error = null
        },
        
        [fetchUser.fulfilled]: (state,action) => {
            state.user = action.payload
            state.loading = false
        },

        [fetchUser.rejected]: (state,action) => {
            state.error = action.error.message
        }
    }

})

export const {logout} = userSlice.actions

export default userSlice.reducer

