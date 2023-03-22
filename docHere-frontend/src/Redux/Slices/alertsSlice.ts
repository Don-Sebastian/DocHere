import { createSlice } from '@reduxjs/toolkit';

interface LoadingType{
    loading: boolean;
}

const initialState: LoadingType = {
    loading: false
}

const alertSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.loading = true;
        },
        hideLoading: (state) => {
            state.loading = false;
        }
    }
});

export const { showLoading, hideLoading } = alertSlice.actions;

export default alertSlice.reducer;