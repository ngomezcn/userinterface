import { createSlice } from "@reduxjs/toolkit";

import { getModelsLis} from "./thunk";

export const initialState = {
    jobList: [],
    jobGrid: [],
    candidateList: [],
    applyJobs: [],
    error: {},
};

const JobsSlice = createSlice({
    name: 'JobsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getModelsLis.fulfilled, (state: any, action: any) => {
            state.jobList = action.payload;
        });
        builder.addCase(getModelsLis.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default JobsSlice.reducer;