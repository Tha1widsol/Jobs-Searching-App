import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {user} from '../../Auth/user'
import {StatusProps} from '../../../types/status'
import {UserProps} from '../../Auth/user'
import axios from 'axios'

const token = localStorage.getItem('token')

interface JobProps extends StatusProps{
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
        salary: string,
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
        workingDays: string,
        workingHours: string,
        applicantsCount: number,
        applyOnOwnWebsite: boolean,
        datePosted: string

    }
}

const initialState: JobProps = {
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
        salary: '',
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
        workingDays: '',
        workingHours: '',
        applicantsCount: 0,
        applyOnOwnWebsite: false,
        datePosted: ''
    }
}

export const fetchJob = createAsyncThunk(
    'user/fetchJob',
    async (id: number) => {
        const response = await axios.get(`/api/job?id=${id}`,{
            headers: {
                Authorization: `Token ${token}`
            }
        })

        return response.data
    }
)

export const JobSlice = createSlice({
    name: 'job',
    initialState,
    reducers:{
        setJob: (state,action) => {
            state.values = action.payload
        }
    },

    extraReducers: {
        [fetchJob.pending.toString()]: (state) => {
            state.status = 'loading'
        },

        [fetchJob.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchJob.rejected.toString()]: (state) => {
            state.status = 'rejected'
        }
    }

})

export const {setJob} = JobSlice.actions

export default JobSlice.reducer