import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {token} from '../../Auth/user'
import axios from 'axios'

const initialState = {
    status: '',
    values: [{
        id: 0,
        title: '',
        companyName: '',
        EmployerName: '',
        EmployerEmail: '',
        EmployerPhone: '',
        description: '',
        years: 0,
        isOnGoing: false
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
        AddProfileExperience: (state,action) => {
          state.values.push(action.payload)
        },

        setDeleteProfileExperience: (state) => {
            state.values = initialState.values
        }
    },

    extraReducers(builder){
        builder
            .addCase(fetchProfileExperience.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchProfileExperience.fulfilled, (state, action) => {
                state.status = 'success'
                state.values = action.payload
            })

            .addCase(fetchProfileExperience.rejected, (state) => {
                state.status = 'rejected'
            })
    }


})

export const {AddProfileExperience,setDeleteProfileExperience} = ProfileExperienceSlice.actions

export default ProfileExperienceSlice.reducer
