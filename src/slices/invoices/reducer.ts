import { createSlice } from "@reduxjs/toolkit";

import { getInvoices, getInvoicesDetail } from "./thunk";

export const initialState = {
    invoices: [],
    invoiceDetail: [],
    error: {},
};

const InovicesSlice = createSlice({
    name: 'InovicesSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInvoices.fulfilled, (state: any, action: any) => {
            state.invoices = action.payload;
        });
        builder.addCase(getInvoices.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(getInvoicesDetail.fulfilled, (state: any, action: any) => {
            state.invoiceDetail = action.payload;
        });
        builder.addCase(getInvoicesDetail.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default InovicesSlice.reducer;