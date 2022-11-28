import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {token} from '../../Auth/user'
import axios from 'axios'

export interface ProfileExperienceListProps{
    status: 'success' | 'loading' | 'rejected' | ''
    values: [{
        id: number
        title: string,
        companyName: string,
        EmployerName: string,
        EmployerEmail: string,
        EmployerPhone: string,
        description: string,
        years: number,
        isOnGoing: boolean
    }]
}

const initialState = {
    status: '',
    values: [{
        id: 0,
        title: '',
        companyName: '',
        EmployerName: '',
        EmployerEmail: '',
        EmployerPhone: '',
        description: '',
        years: 0,
        isOnGoing: false
    }]
} as ProfileExperienceListProps
  
export const fetchProfileExperience = createAsyncThunk(
    'user/fetchProfileExperience',
    async (id: number) => {
        const response = await axios.get(`/api/profileExperience?id=${id}`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })

    return response.data
    }
)

export const ProfileExperienceSlice = createSlice({
    name : 'profileExperience',
    initialState,
    reducers: {
        AddProfileExperience: (state,action) => {
          state.values.push(action.payload)
        },

        DeleteProfileExperience: (state, action) => {
            state.values.slice(state.values.findIndex(exp => exp.id === action.payload))
        },

        setDeleteProfileExperience: (state) => {
            state.values = initialState.values
        },

        editProfileExperience: (state, action) => {
            const index = state.values.findIndex(experience => experience.id === action.payload.id)
            state.values[index] = action.payload
        }
    },

    extraReducers(builder){
        builder
            .addCase(fetchProfileExperience.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchProfileExperience.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchProfileExperience.rejected, (state) => {
                state.status = 'rejected'
            })
    }


})

export const {AddProfileExperience, setDeleteProfileExperience, DeleteProfileExperience, editProfileExperience} = ProfileExperienceSlice.actions

export default ProfileExperienceSlice.reducer
