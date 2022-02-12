import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

interface UserProps {
    values: {id: number | null
        email: string | null
        isHired: boolean | null
        isAnEmployer: boolean | null}

    isLoggedIn: boolean | null
    isLoading: boolean
    error: any
}

const token = localStorage.getItem('token')
const email = sessionStorage.getItem('email')
const isAnEmployer = localStorage.getItem('isAnEmployer')

const initialState: UserProps = {values: {id: null, email: email, isHired: null, isAnEmployer: isAnEmployer === 'true' ? true : isAnEmployer === 'false' ? false : null},isLoggedIn: token ? true : false, isLoading: false, error: null}

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
        [fetchUser.pending]: (state) => {
            state.isLoading = true
            state.error = null
        },
        
        [fetchUser.fulfilled]: (state,action) => {
            state.values = action.payload
            state.isLoading = false
        },

        [fetchUser.rejected]: (state,action) => {
            state.error = action.error.message
        }
    }

})

export const {logout} = userSlice.actions

export default userSlice.reducer

