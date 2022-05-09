import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {token} from '../../Auth/user'
import axios from 'axios'

const initialState = {
    status: '',
    values: {
      doesExist: false
    }
}

export const checkApplicationExists = createAsyncThunk(
    'user/checkApplicationExists',
    async (id: number) => {
        const response = await axios.get(`/api/checkApplication?id=${id}`,{
            headers: {
                Authorization:`Token ${token}`
            }
        })

    return response.data
  }
)

export const checkApplicationExistsSlice = createSlice({
    name: 'checkApplicationExists',
    initialState,
    reducers: {
        setApplicationExists: (state,action) => {
          state.values = action.payload
        }
    }

})

export const {setApplicationExists} = checkApplicationExistsSlice.actions

export default checkApplicationExistsSlice.reducer