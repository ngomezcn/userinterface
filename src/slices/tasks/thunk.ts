import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getTasks as getTasksApi
} from "../../helpers/fakebackend_helper";

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
    try {
        const response = getTasksApi();
        return response;
    } catch (error) {
        return error;
    }
});