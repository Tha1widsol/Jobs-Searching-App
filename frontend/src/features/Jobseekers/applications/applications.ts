import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {token} from '../../Auth/user'
import {profile} from '../profiles/profile'
import {job} from '../../Employers/jobs/job'
import axios from 'axios'

const initialState = {
    status: '',
    values: [{
        id: 0,
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
        const response = await axios.get(`/api/applications/${endpoint}`,{
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
        },
        
        deleteApplication: (state, action) => {
            state.values.splice(state.values.findIndex(application => application.id === action.payload))
        }
    },

    extraReducers(builder){
        builder
            .addCase(fetchApplications.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchApplications.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchApplications.rejected, (state) => {
                state.status = 'rejected'
            })
    }


})

export const {setApplications, setDeleteApplications, deleteApplication} = ApplicationsSlice.actions

export default ApplicationsSlice.reducer