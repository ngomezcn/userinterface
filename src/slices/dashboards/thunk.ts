import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getEarningChartsData as getEarningChartsDataApi,
    getTopSellingData as getTopSellingDataApi,
    getWeeklyData as getWeeklyDataApi,
    getYearlyData as getYearlyDataApi,
    getMonthlyData as getMonthlyDataApi,
    getTranscation as getTranscationApi
} from "../../helpers/fakebackend_helper";

export const getEarningChartsData = createAsyncThunk("dashboard/getEarningChartsData", async (month: any) => {
    try {
        const response = getEarningChartsDataApi(month);
        return response;
    } catch (error) {
        return error;
    }
});

export const getTopSellingData = createAsyncThunk("dashboard/getTopSellingData", async (month: any) => {
    try {
        const response = getTopSellingDataApi(month);
        return response;
    } catch (error) {
        return error;
    }
});

export const getChartData = createAsyncThunk("dashboard/getChartData", async (data: any) => {
    try {
        var response;
        if (data === "weekly") {
            response = getWeeklyDataApi(data);
        }
        if (data === "monthly") {
            response = getMonthlyDataApi(data);
        }
        if (data === "yearly") {
            response = getYearlyDataApi(data);
        }
        return response;

    } catch (error) {
        return error;
    }
});

export const getTranscation = createAsyncThunk("dashboard/getTranscation", async () => {
    try {
        const response = getTranscationApi();
        return response;
    } catch (error) {
        return error;
    }
});
