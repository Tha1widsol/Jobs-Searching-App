import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {token} from '../../Auth/user'
import axios from 'axios'

const initialState = {
    status: '',
    values: [{
        id: 0,
        title: '',
        EmployerName: '',
        EmployerEmail: '',
        EmployerPhone: '',
        description: '',
        years: 0,
        reference: '',
        ongoing: false
    }]
}
  
export const fetchProfileExperience = createAsyncThunk(
    'user/fetchProfileExperience',
    async (id: number) => {
        const response = await axios.get(`/api/profileExperience?id=${id}`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })

    return response.data
    }
)

export const ProfileExperienceSlice = createSlice({
    name : 'profileExperience',
    initialState,
    reducers: {
        setProfile: (state,action) => {
          state.values = action.payload
        },

        setDeleteProfileExperience: (state) => {
            state.values = initialState.values
        }
    },

    extraReducers: {
        [fetchProfileExperience.pending.toString()]: (state) => {
            state.status = 'loading'
        },
        
        [fetchProfileExperience.fulfilled.toString()]: (state,action) => {
            state.values = action.payload
            state.status = 'success'
        },

        [fetchProfileExperience.rejected.toString()]: (state) => {
            state.status = 'rejected'
    }
  }

})

export const {setProfile,setDeleteProfileExperience} = ProfileExperienceSlice.actions

export default ProfileExperienceSlice.reducer
