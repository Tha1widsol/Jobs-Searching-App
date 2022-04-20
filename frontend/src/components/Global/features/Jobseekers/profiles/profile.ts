import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {UserProps,user,token} from '../../Auth/user'
import {StatusProps} from '../../../types/status'
import axios from 'axios'

export interface ProfileProps extends StatusProps{
    values: {
        user: UserProps
        firstName: string
        lastName: string
        middleName?: string
        skills: [{name: string}]
        phone: string
        logo?: string
        cv: string
        education: string
        industry: string
        distance: string
        experience?: string
        about: string
        isActive: boolean
    }
  
}

const initialState: ProfileProps = {
    status: '',
    values: {
    user,
    firstName: '',
    middleName: '',
    lastName: '',
    skills: [{name: ''}],
    phone: '',
    logo: '',
    cv: '',
    education: '',
    industry: '',
    distance: '',
    experience: '',
    about: '',
    isActive: false,
    }

}
  
export const fetchProfile = createAsyncThunk(
    'user/fetchProfile',
    async (id: number) => {
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
        },

        setDeleteProfile: (state) => {
            state.values = initialState.values
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

export const {setProfile,setToggleStatus,setDeleteProfile} = ProfileSlice.actions

export default ProfileSlice.reducer
