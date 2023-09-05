import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getProjects as getProjectsApi,
    getIntegrations as getIntegrationsApi,
    getProjectsDetail as getProjectsDetailApi,
    addNewProject as addNewProjectApi,
    updateProject as updateProjectApi,
    deleteProject as deleteProjectApi,
    getDemoData
} from "../../helpers/fakebackend_helper";
import { getIn } from "yup/lib/util/reach";

export const getIntegrations = createAsyncThunk("projects/getProjects", async () => {
    try {
        const response = getIntegrationsApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getProjects = createAsyncThunk("projects/getProjects", async () => {
    try {
        const response = getProjectsApi();
        console.log(response)
        return response;
    } catch (error) {
        return error;
    }
});

export const getProjectsDetail = createAsyncThunk("projects/getProjectsDetail", async (projectId: any) => {
    try {
        const response = getProjectsDetailApi(projectId);
        return response;
    } catch (error) {
        return error;
    }
})

export const addNewProject = createAsyncThunk("projects/addproject", async (project: any) => {
    try {
        const response = addNewProjectApi(project);
        const data = await response;
        return data;
    } catch (error) {
        return error;
    }
})

export const updateProject = createAsyncThunk("projects/updatproject", async (project: any) => {
    try {
        const response = updateProjectApi(project);
        const data = await response;
        return data;
    } catch (error) {
        return error
    }
})

export const deleteProject = createAsyncThunk("projects/deleteproject", async (project: any) => {
    try {
        const response = deleteProjectApi(project);
        return response;
    } catch (error) {
        return error;
    }
})