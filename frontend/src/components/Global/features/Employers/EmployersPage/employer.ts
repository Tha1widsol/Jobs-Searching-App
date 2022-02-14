import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {EmployerProps} from './types'
import axios from 'axios'

const token = localStorage.getItem('token')

const initialState: EmployerProps = {values:{
    user: {
        email: '',
        isHired: null, 
        isAnEmployer: null
    },
    firstName: '',
    middleName: '',
    lastName: '',
    about: '',
    logo: '',
    status: null
}}

export const fetchEmployer: any = createAsyncThunk(
    'user/fetchEmployer',
    async () => {
        const response = await axios.get('/api/employer',{
            headers: {
                Authorization:`Token ${token}`
            }
        })

    return response.data
     }
)

export const EmployerSlice = createSlice({
    name: 'employer',
    initialState,
    reducers: {
        setEmployer: (state,action) => {
            state.values = action.payload
          }
    }
    
    ,extraReducers: {
        [fetchEmployer.pending]: (state) => {
            state.values.status = 'loading'
        },
        
        [fetchEmployer.fulfilled]: (state,action) => {
            state.values = action.payload
            state.values.status = 'success'
        },

        [fetchEmployer.rejected]: (state) => {
            state.values.status = 'rejected'
     }
    },

})

export const {setEmployer} = EmployerSlice.actions

export default EmployerSlice.reducer