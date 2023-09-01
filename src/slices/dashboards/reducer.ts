import { createSlice } from "@reduxjs/toolkit";

import { getEarningChartsData, getTopSellingData, getChartData, getTranscation } from "./thunk";

export const initialState = {
    dashboard: [],
    dashboardTranscation: [],
    dashboardSaas: [],
    dashboardChartData: [],
    error: {}
};

const dashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {},
    extraReducers: (builder: any) => {
        builder.addCase(getEarningChartsData.fulfilled, (state: any, action: any) => {
            state.dashboard = action.payload;
        });

        builder.addCase(getEarningChartsData.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getTopSellingData.fulfilled, (state: any, action: any) => {
            state.dashboardSaas = action.payload;
        });

        builder.addCase(getTopSellingData.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getChartData.fulfilled, (state: any, action: any) => {
            state.dashboardChartData = action.payload;
        });

        builder.addCase(getChartData.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload.error : "";
        });

        builder.addCase(getTranscation.fulfilled, (state: any, action: any) => {
            state.dashboardTranscation = action.payload;
        });

        builder.addCase(getTranscation.rejected, (state: any, action: any) => {
            state.error = action.payload ? action.payload.error : '';
        });
    }
})

export default dashboardSlice.reducer;