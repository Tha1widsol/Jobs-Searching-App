import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {job} from '../../Employers/jobs/job'
import { StatusProps } from '../../../components/Global/types/status'
import {user as employer,UserProps,token} from '../../Auth/user'
import {company} from '../../Employers/companies/companies'
import axios from 'axios'

export interface MatchingJobsProps extends StatusProps{
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
        job:{
            id: number,
            title: string,
            description: string,
            salary1: string,
            salary2: string,
            currency: string,
            roles: {name: string}[],
            industry: string,
            remote: boolean,
            type: string,
            training: boolean,
            positions: string,
            education: string,
            skills: {name: string}[],
            startDate: string,
            benefits: {name: string}[],
            workingDay1: string,
            workingDay2: string
            workingHours: string,
            applicantsCount: number,
            applyOnOwnWebsite: boolean,
            link: string,
            datePosted: string
        }
        score: number
    }]
}

export const initialState: MatchingJobsProps = {
    status: '',
    values: [{
    employer,
    company,
    job,
    score: 0
  }]
}

export const fetchMatchingJobs = createAsyncThunk(
    'user/fetchMatchingJobs',
    async (searchVal: string) => {
        const response = await axios.get(`/api/jobseeker/jobs?q=${searchVal}`,{
            headers: {
                Authorization: `Token ${token}`
            }
        })
        return response.data
        }
)

export const matchingJobsSlice = createSlice({
    name: 'matchingJobs',
    initialState,
    reducers:{
        setMatchingJobs: (state,action) => {
            state.values = action.payload
        },

    },

    extraReducers(builder){
        builder
            .addCase(fetchMatchingJobs.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchMatchingJobs.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchMatchingJobs.rejected, (state) => {
                state.status = 'rejected'
            })
    }


})

export const {setMatchingJobs} = matchingJobsSlice.actions

export default matchingJobsSlice.reducer