import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {user,UserProps,token} from '../../Auth/user'
import {StatusProps} from '../../../types/status'
import axios from 'axios'

export interface CompaniesProps extends StatusProps{
    values: [{
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
    }]
  
}

export const company = {
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

const initialState: CompaniesProps = {
status: '',
  values: [{
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
        setCompanies: (state, action) => {
            state.values = action.payload
        },

        deleteCompany: (state, action) => {
            state.values.slice(state.values.findIndex(company => company.id === action.payload))
        }
    },

    extraReducers(builder){
        builder
            .addCase(fetchCompanies.pending, (state) => {
                state.status = 'loading'
            })
            
            .addCase(fetchCompanies.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchCompanies.rejected, (state) => {
                state.status = 'rejected'
            })
    }

})


export const {setCompanies,deleteCompany} = CompaniesSlice.actions
export default CompaniesSlice.reducer