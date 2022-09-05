import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {user as employer,UserProps,token} from '../../Auth/user'
import {StatusProps} from '../../../types/status'
import {company} from '../companies/companies'
import axios from 'axios'

export interface JobsProps extends StatusProps{
    values: [{
        employer: UserProps
        company:{
            id: number
            name: string
            email: string
            about: string
            phone: string
            logo: string
            banner: string
            industry: string
            website: string
        },
        id: number,
        title: string,
        description: string,
        salary1: string,
        salary2: string,
        currency: string,
        roles: [{name: string}],
        industry: string,
        remote: boolean,
        type: string,
        training: boolean,
        positions: string,
        education: string,
        skills: [{name: string}],
        startDate: string,
        benefits: [{name: string}],
        workingDay1: string,
        workingDay2: string
        workingHours: string,
        applicantsCount: number,
        applyOnOwnWebsite: boolean,
        link: string,
        datePosted: string

    }]
}

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

export const fetchJobs = createAsyncThunk(
    'user/fetchJobs',
    async (type: 'employer' | 'jobseeker') => {
        const response = await axios.get(`/api/${type}/jobs`,{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data
    }
)

export const JobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers:{
        setJobs: (state,action) => {
            state.values = action.payload
        }
    },

    extraReducers: {
        [fetchJobs.pending.toString()]: (state) => {
            state.status = 'loading'
        },

        [fetchJobs.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchJobs.rejected.toString()]: (state) => {
            state.status = 'rejected'
        }
    }

})

export const {setJobs} = JobsSlice.actions

export default JobsSlice.reducer