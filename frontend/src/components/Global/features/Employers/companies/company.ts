import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {UserProps} from '../../Auth/user'
import {user} from '../../Auth/user'
import {StatusProps} from '../../../types/status'
import axios from 'axios'

const token = localStorage.getItem('token')

interface CompanyProps extends StatusProps{
    values: {
        user: UserProps
        id: number
        name: string
        email: string
        about: string
        phone: string
        logo?: string
        banner?: string 
        industry: string
        website?: string
    }
}

const initialState: CompanyProps = {
status: '',
values: {
   user,
    id: 0,
    name: '',
    email: '',
    about: '',
    phone: '',
    logo: '',
    banner: '',
    industry: '',
    website: ''
  }
   
}

export const fetchCompany = createAsyncThunk(
    'user/fetchCompany',
     async (id: number) => {
        const response = await axios.get(`/api/company?id=${id}`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })
        return response.data
    }
)

export const CompanySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {
        setCompany: (state,action) => {
            state = action.payload
        }
    },

    extraReducers: {
        [fetchCompany.pending.toString()]: (state) => {
            state.status = 'loading'
        },
        
        [fetchCompany.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchCompany.rejected.toString()]: (state) => {
            state.status = 'rejected'
        }
    }

})


export const {setCompany} = CompanySlice.actions

export default CompanySlice.reducer