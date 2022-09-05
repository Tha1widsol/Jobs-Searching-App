import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import { JobsProps } from '../Employers/jobs/jobs'
import {user as employer, UserProps, token} from '../Auth/user'
import {company} from '../Employers/companies/companies'
import axios from 'axios'

const initialState: JobsProps = {
    status: '',
    values: [{
        employer,
        company,
        id: 0,
        title: '',
        description: '',
        salary1: '',
        salary2: '',
        currency: '',
        roles: [{name: ''}],
        industry: '',
        remote: false,
        type: '',
        training: false,
        positions: '',
        education: '',
        skills: [{name: ''}],
        startDate: '',
        benefits: [{name: ''}],
        workingDay1: '',
        workingDay2: '',
        workingHours: '',
        applicantsCount: 0,
        applyOnOwnWebsite: false,
        link: '',
        datePosted: ''
    }]
}

export const fetchHomePageJobs = createAsyncThunk(
    'user/fetchJobs',
    async (searchVal: string) => {
        const response = await axios.get(`/api/homePageJobs?q=${searchVal}`)
        return response.data
    }
)

export const HomePageJobsSlice = createSlice({
    name: 'homePageJobs',
    initialState,
    reducers:{
        setJobs: (state,action) => {
            state.values = action.payload
        }
    },

    extraReducers: {
        [fetchHomePageJobs.pending.toString()]: (state) => {
            state.status = 'loading'
        },

        [fetchHomePageJobs.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchHomePageJobs.rejected.toString()]: (state) => {
            state.status = 'rejected'
        }
    }

})

export const {setJobs} = HomePageJobsSlice.actions

export default HomePageJobsSlice.reducer
