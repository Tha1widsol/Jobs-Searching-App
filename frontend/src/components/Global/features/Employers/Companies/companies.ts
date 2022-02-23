import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {CompaniesProps} from './types'
import axios from 'axios'

const token = localStorage.getItem('token')

const initialState: CompaniesProps = {
status: '',
  values: [{
    user: {
        id: null,
        email: '',
        isHired: null, 
        isAnEmployer: null
    },
    id: null,
    name: '',
    email: '',
    about: '',
    phone: '',
    logo: '',
    banner: '',
    industry: '',
    website: ''

  }],

}

export const fetchCompanies = createAsyncThunk(
    'user/fetchCompanies',
     async () => {
        const response = await axios.get('/api/companies',{
            headers: {
                Authorization:`Token ${token}`
            }
        })

        return response.data
    }
)

export const CompaniesSlice = createSlice({
    name: 'companies',
    initialState,
    reducers: {
        setCompanies: (state,action) => {
            state.values = action.payload
        }
    },

    extraReducers: {
        [fetchCompanies.pending.toString()]: (state) => {
            state.status = 'loading'
        },
        
        [fetchCompanies.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchCompanies.rejected.toString()]: (state) => {
            state.status = 'rejected'
     }
    }

})


export const {setCompanies} = CompaniesSlice.actions

export default CompaniesSlice.reducer