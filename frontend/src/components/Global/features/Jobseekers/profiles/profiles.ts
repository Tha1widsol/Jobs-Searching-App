import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import {StatusProps} from '../../../types/status'
import {user,UserProps,token} from '../../Auth/user'

interface ProfilesProps extends StatusProps{
    values: [{
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
    }]
  
}

const initialState: ProfilesProps = {
    status: '',
    values: [{
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
    }]

}
  
export const fetchProfiles = createAsyncThunk(
    'user/fetchProfiles',
    async () => {
        const response = await axios.get(`/api/profiles`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })

    return response.data
    }
)

export const ProfilesSlice = createSlice({
    name : 'profiles',
    initialState,
    reducers: {
        setProfiles: (state,action) => {
          state.values = action.payload
        },
    },

    extraReducers: {
        [fetchProfiles.pending.toString()]: (state) => {
            state.status = 'loading'
        },
        
        [fetchProfiles.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchProfiles.rejected.toString()]: (state) => {
            state.status = 'rejected'
    }
  }

})

export const {setProfiles} = ProfilesSlice.actions

export default ProfilesSlice.reducer
