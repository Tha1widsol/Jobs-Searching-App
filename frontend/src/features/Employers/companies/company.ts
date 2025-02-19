import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {user,UserProps} from '../../Auth/user'
import {StatusProps} from  '../../../components/Global/types/status'
import axios from 'axios'

export interface CompanyProps extends StatusProps{
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
        isActive: boolean
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
    website: '',
    isActive: false
  }
   
}

export const fetchCompany = createAsyncThunk(
    'user/fetchCompany',
     async (id: number) => {
        const response = await axios.get(`/api/company?id=${id}`)
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

    extraReducers(builder){
        builder
            .addCase(fetchCompany.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchCompany.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchCompany.rejected, (state) => {
                state.status = 'rejected'
            })
    }

})


export const {setCompany} = CompanySlice.actions

export default CompanySlice.reducer