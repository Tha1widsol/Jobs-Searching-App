import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {token} from '../../Auth/user'
import {profile} from '../profiles/profile'
import {job} from '../../Employers/jobs/job'
import axios from 'axios'

const initialState = {
    status: '',
    values: [{
        profile,
        job,
        coverLetter: '',
        status: '',
        applicationDate: ''
    }]
}

export const fetchApplications = createAsyncThunk(
    'user/fetchApplications',
    async (endpoint: string) => {
        const response = await axios.get(`/api/${endpoint}`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })

    return response.data
    }
)

export const ApplicationsSlice = createSlice({
    name : 'applications',
    initialState,
    reducers: {
        setApplications: (state,action) => {
          state.values = action.payload
        },

        setDeleteApplications: (state) => {
            state.values = initialState.values
        }
    },

    extraReducers: {
        [fetchApplications.pending.toString()]: (state) => {
            state.status = 'loading'
        },
        
        [fetchApplications.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchApplications.rejected.toString()]: (state) => {
            state.status = 'rejected'
    }
  }

})

export const {setApplications,setDeleteApplications} = ApplicationsSlice.actions

export default ApplicationsSlice.reducer