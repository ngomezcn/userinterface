import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getDemoData as getDemoDataApi,
    getJobList as getJobListApi,
    deleteJobList as getDeleteJobListApi,
    getApplyJob as getApplyJobApi,
    deleteApplyJob as deleteApplyJobApi,
    addNewJobList as addNewJobListApi,
    updateJobList as updateJobListApi,
    getJobGrid as getJobGridApi,
    getJobCandidateList as getJobCandidateListApi,
    getIntegrationTemplates as getIntegrationTemplatesApi,

    getModelsList as getModelsListApi,
} from "../../helpers/fakebackend_helper";

export const getModelsLis = createAsyncThunk("jobs/getJobsList", async () => {
    try {
        const response = getModelsListApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const deleteJobList = createAsyncThunk("jobs/deleteJobList", async (jobs: any) => {
    try {
        const response = getDeleteJobListApi(jobs);
        return response;
    } catch (error) {
        return error;
    }
})

export const getApplyJob = createAsyncThunk("jobs/getApplyJob", async () => {
    try {
        const response = getApplyJobApi();
        return response;
    } catch (error) {
        return error;
    }
})

export const deleteApplyJob = createAsyncThunk("jobs/deleteApplyJob", async (jobs: any) => {
    try {
        const response = deleteApplyJobApi(jobs);
        return response;
    } catch (error) {
        return error;
    }
})

export const addNewJobList = createAsyncThunk("jobs/addNewJob", async (jobs: any) => {
    try {
        const response = addNewJobListApi(jobs);
        return response;
    } catch (error) {
        return error;
    }
})

export const updateJobList = createAsyncThunk("jobs/updateJob", async (jobs: any) => {
    try {
        const response = updateJobListApi(jobs);
        return response;
    } catch (error) {
        return error;
    }
})

export const getIntegrationTemplates = createAsyncThunk("jobs/getJobsGrid", async () => {
    try {
        const response = getIntegrationTemplatesApi();
        return response;
    } catch (error) {
        return error;
    }
});

//job grid
export const getJobGrid = createAsyncThunk("jobs/getJobsGrid", async () => {
    try {
        const response = getJobListApi();
        return response;
    } catch (error) {
        return error;
    }
});

//job Candidate List
export const getJobCandidateList = createAsyncThunk("jobs/getJobsCandidateList", async () => {
    try {
        const response = getJobCandidateListApi();
        return response;
    } catch (error) {
        return error;
    }
});