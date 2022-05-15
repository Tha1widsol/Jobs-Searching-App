import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {token} from '../../Auth/user'
import {job} from '../../Employers/jobs/job'
import axios from 'axios'

const initialState = {
    status: '',
    values: [{
        id: 0,
        job,
        savedDate: ''
    }]
}

export const fetchSavedJobs = createAsyncThunk(
    'user/fetchSavedJobs',
    async () => {
        const response = await axios.get(`/api/saved-jobs`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })

    return response.data
    }
)

export const SavedJobsSlice = createSlice({
    name : 'savedJobs',
    initialState,
    reducers: {
        setSavedJobs: (state, action) => {
          state.values = action.payload
        },

        setDeleteSavedJob: (state, action) => {
            state.values.splice(state.values.findIndex(savedJob => savedJob.id === action.payload))
        }
    },

    extraReducers: {
        [fetchSavedJobs.pending.toString()]: (state) => {
            state.status = 'loading'
        },
        
        [fetchSavedJobs.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchSavedJobs.rejected.toString()]: (state) => {
            state.status = 'rejected'
    }
  }

})

export const {setSavedJobs,setDeleteSavedJob} = SavedJobsSlice.actions

export default SavedJobsSlice.reducer