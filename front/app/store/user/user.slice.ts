import { getStoreLocal } from './../../utils/localStorage';
import { IInitialState } from './user.interface';
import { createSlice } from "@reduxjs/toolkit";

const initialState: IInitialState = {
    isLoading: false,
    user: getStoreLocal('user')
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {

    }
})