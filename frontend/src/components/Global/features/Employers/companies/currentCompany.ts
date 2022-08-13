import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {user, token} from '../../Auth/user'
import {CompanyProps} from './company'
import axios from 'axios'


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

export const fetchCurrentCompany = createAsyncThunk(
    'user/fetchCurrentCompany',
     async () => {
        const response = await axios.get(`/api/currentCompany`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })
        return response.data
    }
)

export const currentCompanySlice = createSlice({
    name: 'currentCompany',
    initialState,
    reducers: {
        setcurrentCompany: (state,action) => {
            state = action.payload
        }
    },

    extraReducers: {
        [fetchCurrentCompany.pending.toString()]: (state) => {
            state.status = 'loading'
        },
        
        [fetchCurrentCompany.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchCurrentCompany.rejected.toString()]: (state) => {
            state.status = 'rejected'
        }
    }

})

export const {setcurrentCompany} = currentCompanySlice.actions
export default currentCompanySlice.reducer