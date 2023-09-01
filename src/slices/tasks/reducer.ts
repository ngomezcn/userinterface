import { createSlice } from "@reduxjs/toolkit";

import { getTasks } from "./thunk";

export const initialState = {
    tasks: [],
    error: {},
};

const TasksSlice = createSlice({
    name: 'TasksSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getTasks.fulfilled, (state: any, action: any) => {
            state.tasks = action.payload;
        });
        builder.addCase(getTasks.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default TasksSlice.reducer;