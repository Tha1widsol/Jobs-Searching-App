import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {user,UserProps,token} from '../../Auth/user'
import {StatusProps} from '../../../types/status'
import axios from 'axios'
import { fetchCurrentCompany } from '../companies/currentCompany'

export interface JobProps extends StatusProps{
    values: {
        user: UserProps
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

    }
}

export const job = {
    user,
    company: {
        id: 0,
        name: '',
        email: '',
        about: '',
        phone: '',
        logo: '',
        banner: '',
        industry: '',
        website: ''
    },
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
}

export const initialState: JobProps = {
    status: '',
    values: {
        user,
        company: {
            id: 0,
            name: '',
            email: '',
            about: '',
            phone: '',
            logo: '',
            banner: '',
            industry: '',
            website: ''
        },
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
    }
}

export const fetchJob = createAsyncThunk(
    'user/fetchJob',
    async (id: number) => {
        const response = await axios.get(`/api/job?id=${id}`)
        return response.data
    }
)

export const JobSlice = createSlice({
    name: 'job',
    initialState,
    reducers:{
        setJob: (state,action) => {
            state.values = action.payload
        },
        
        setDeleteJob:(state) => {
            state.values = initialState.values
        }
    
    },

    extraReducers(builder){
        builder
            .addCase(fetchJob.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchJob.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchJob.rejected, (state) => {
                state.status = 'rejected'
            })
    }

})

export const {setJob,setDeleteJob} = JobSlice.actions

export default JobSlice.reducer