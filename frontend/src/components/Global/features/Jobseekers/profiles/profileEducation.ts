import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import { ProfileEducationListProps } from './types/profileEducationProps'
import {token} from '../../Auth/user'
import axios from 'axios'

const initialState = {
    status: '',
    values: [{
        id: 0,
        education: '',
        field: '',
        institution: '',
        country: '',
        city: '',
        currentlyEnrolled: false,
        fromDate: '',
        toDate: ''
    }]
} as ProfileEducationListProps

export const fetchProfileEducation = createAsyncThunk(
    'user/fetchProfileEducation',
    async (id: number) => {
        const response = await axios.get(`/api/profile/education?id=${id}`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })

    return response.data
    }
)

export const ProfileEducationSlice = createSlice({
    name : 'profileEducation',
    initialState,
    reducers: {
        addProfileEducation: (state,action) => {
          state.values.push(action.payload)
        },

        deleteProfileEducation: (state, action) => {
           state.values.slice(state.values.findIndex(exp => exp.id === action.payload))
        },

        setDeleteProfileEducation: (state) => {
            state.values = initialState.values
        },

        editProfileEducation: (state, action) => {
            const index = state.values.findIndex(Education => Education.id === action.payload.id)
            state.values[index] = action.payload
        },
        
    },

    extraReducers(builder){
        builder
            .addCase(fetchProfileEducation.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchProfileEducation.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchProfileEducation.rejected, (state) => {
                state.status = 'rejected'
            })
    }


})

export const {addProfileEducation, setDeleteProfileEducation, deleteProfileEducation, editProfileEducation} = ProfileEducationSlice.actions
export default ProfileEducationSlice.reducer