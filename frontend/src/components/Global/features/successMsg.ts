import { createSlice } from "@reduxjs/toolkit";

export const successMsg = createSlice({
    name: 'success',
    initialState: {value: ''},
    reducers: { 
        setMessage: (state,action) => {
            state.value = action.payload
        }
    }
})

export const {setMessage} = successMsg.actions

export default successMsg.reducer
