import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {user,token} from '../../Auth/user'
import { ProfileProps } from './types/profileProps'
import axios from 'axios'


export const profile = {
    id: 0,
    user,
    firstName: '',
    middleName: '',
    lastName: '',
    skills: [{id: 0, name: '', generic: true}],
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

const initialState: ProfileProps = {
    status: '',
    values: {
    id: 0,
    user,
    firstName: '',
    middleName: '',
    lastName: '',
    skills: [{id: 0 ,name: '', generic: true}],
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

    extraReducers(builder){
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchProfile.rejected, (state) => {
                state.status = 'rejected'
            })
    }


})

export const {setProfile,setToggleStatus,setDeleteProfile} = ProfileSlice.actions

export default ProfileSlice.reducer
