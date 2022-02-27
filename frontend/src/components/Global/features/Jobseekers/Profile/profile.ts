import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {ProfileProps} from './types'
import axios from 'axios'

const token = localStorage.getItem('token')
const initialState: ProfileProps = {values: {
    user: {
        id: null,
        email: '',
        isHired: null, 
        isAnEmployer: null
    },
    firstName: '',
    middleName: '',
    lastName: '',
    skills: [],
    phone: '',
    logo: '',
    cv: '',
    education: '',
    industry: '',
    distance: '',
    experience: '',
    about: '',
    isActive: null,
    status: ''
    }

}
  
export const fetchProfile = createAsyncThunk(
    'user/fetchProfile',
    async (id: number | null) => {
        const response = await axios.get(`/api/profile?id=${id}`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })

    return response.data
    }
)

export const ProfileSlice = createSlice({
    name : 'profile',
    initialState,
    reducers: {
        setProfile: (state,action) => {
          state.values = action.payload
        },

        setToggleStatus: (state) => {
            state.values.isActive = !state.values.isActive
        }
    },

    extraReducers: {
        [fetchProfile.pending.toString()]: (state) => {
            state.values.status = 'loading'
        },
        
        [fetchProfile.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.values.status = 'success'
        },

        [fetchProfile.rejected.toString()]: (state) => {
            state.values.status = 'rejected'
    }
  }

})

export const {setProfile,setToggleStatus} = ProfileSlice.actions

export default ProfileSlice.reducer
