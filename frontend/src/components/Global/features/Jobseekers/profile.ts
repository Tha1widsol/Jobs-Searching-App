import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

import {UserProps} from '../Auth/types'
import {StatusProps} from '../../types/status'

export interface ProfileProps extends StatusProps{
    values: {
        user: UserProps
        firstName: string
        lastName: string
        middleName?: string
        skills: {name: string}[]
        phone: string
        logo?: string
        cv: string
        education: string
        industry: string
        distance: string
        experience?: string
        about: string
        isActive: boolean | null
      
    }
  
}

const token = localStorage.getItem('token')
const initialState: ProfileProps = {
    status: '',
    values: {
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
            state.status = 'loading'
        },
        
        [fetchProfile.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchProfile.rejected.toString()]: (state) => {
            state.status = 'rejected'
    }
  }

})

export const {setProfile,setToggleStatus} = ProfileSlice.actions

export default ProfileSlice.reducer
