import { createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
    name: 'global',
    initialState: {
        mode: 'dark',
        userId: "63701cc1f03239b7f700000e"
    },
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'dark' ? 'light' : 'dark';
        }
    }
});

export const { setMode } = globalSlice.actions;

export default globalSlice;