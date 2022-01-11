import {createSlice} from '@reduxjs/toolkit'

export const dropdownSlice = createSlice({
    name : 'dropdown',
    initialState: {navDropdownOn: false},
    reducers: {
        toggleNavDropdown: (state) => {
            state.navDropdownOn = !state.navDropdownOn
        },

        navDropdownOff: (state) => {
            state.navDropdownOn = false
        }

    }
})

export const {toggleNavDropdown,navDropdownOff} = dropdownSlice.actions

export default dropdownSlice.reducer