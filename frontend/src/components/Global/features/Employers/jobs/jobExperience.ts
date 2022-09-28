import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {token} from '../../Auth/user'
import axios from 'axios'

const initialState = {
    status: '',
    values: [{
        experience: '',
        years: 0,
        required: false
    }]
}

export const fetchJobExperience = createAsyncThunk(
    'user/fetchJobExperience',
    async (id: number) => {
        const response = await axios.get(`/api/jobExperience?id=${id}`,{
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

export const {setJobExperience,setDeleteJobExperience} = JobExperienceSlice.actions

export default JobExperienceSlice.reducer