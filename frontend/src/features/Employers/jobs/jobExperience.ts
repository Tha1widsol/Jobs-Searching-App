import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {token} from '../../Auth/user'
import axios from 'axios'

export interface JobExperienceListProps{
    status: 'success' | 'loading' | 'rejected' | ''
    values: {
        id: number,
        experience: string,
        years: number,
        required: boolean
    }[]
}


const initialState = {
    status: '',
    values: [{
        id: 0,
        experience: '',
        years: 0,
        required: false
    }]
} as JobExperienceListProps

export const fetchJobExperience = createAsyncThunk(
    'user/fetchJobExperience',
    async (id: number) => {
        const response = await axios.get(`/api/job/experience?id=${id}`,{
            headers: {
                Authorization: `Token ${token}`
            }
        })

        return response.data
    }
)

export const JobExperienceSlice = createSlice({
    name: 'jobExperience',
    initialState,
    reducers:{
        setJobExperience: (state,action) => {
            state.values = action.payload
        },
        
        setDeleteJobExperience:(state) => {
            state.values = initialState.values
        },

        addJobExperience: (state, action) => {
            state.values.push(action.payload)
          },
  
          deleteJobExperience: (state, action) => {
              state.values.slice(state.values.findIndex(exp => exp.id === action.payload))
          },
  
          editJobExperience: (state, action) => {
              const index = state.values.findIndex(experience => experience.id === action.payload.id)
              state.values[index] = action.payload
          }
    
    },

    extraReducers(builder){
        builder
            .addCase(fetchJobExperience.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchJobExperience.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchJobExperience.rejected, (state) => {
                state.status = 'rejected'
            })
    }

})

export const {setJobExperience, setDeleteJobExperience, addJobExperience, deleteJobExperience, editJobExperience} = JobExperienceSlice.actions

export default JobExperienceSlice.reducer