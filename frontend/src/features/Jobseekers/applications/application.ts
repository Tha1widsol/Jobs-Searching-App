import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {token} from '../../Auth/user'
import {profile} from '../profiles/profile'
import {job} from '../../Employers/jobs/job'
import axios from 'axios'

const initialState = {
    status: '',
    values: {
        profile,
        job,
        coverLetter: '',
        status: '',
        applicationDate: ''
    }
}

export const fetchApplication = createAsyncThunk(
    'user/fetchApplication',
    async (id: number) => {
        const response = await axios.get(`/api/application?id=${id}`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })

    return response.data
  }
)

export const ApplicationSlice = createSlice({
    name: 'application',
    initialState,
    reducers: {
        setApplication: (state,action) => {
          state.values = action.payload
        },

        setDeleteApplication: (state) => {
            state.values = initialState.values
        }
    },

    extraReducers(builder){
        builder
            .addCase(fetchApplication.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchApplication.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchApplication.rejected, (state) => {
                state.status = 'rejected'
            })
    }

})

export const {setApplication,setDeleteApplication} = ApplicationSlice.actions

export default ApplicationSlice.reducer