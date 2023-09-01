import { createSlice } from "@reduxjs/toolkit";

import { getInboxMails, getStarredMails, getImportantMails, getDraftMails, getSentMails, getTrashMails, deleteMail } from "./thunk";

export const initialState = {
    inboxmails: [],
    starredmails: [],
    importantmails: [],
    draftmails: [],
    sentmails: [],
    trashmails: [],
    error: {},
};

const EmailsSlice = createSlice({
    name: 'EmailsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getInboxMails.fulfilled, (state: any, action: any) => {
            state.inboxmails = action.payload;
        });
        builder.addCase(getInboxMails.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getStarredMails.fulfilled, (state: any, action: any) => {
            state.starredmails = action.payload;
        });
        builder.addCase(getStarredMails.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getImportantMails.fulfilled, (state: any, action: any) => {
            state.importantmails = action.payload;
        });
        builder.addCase(getImportantMails.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(getDraftMails.fulfilled, (state: any, action: any) => {
            state.draftmails = action.payload;
        });
        builder.addCase(getDraftMails.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(getSentMails.fulfilled, (state: any, action: any) => {
            state.sentmails = action.payload;
        });
        builder.addCase(getSentMails.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(getTrashMails.fulfilled, (state: any, action: any) => {
            state.trashmails = action.payload;
        });
        builder.addCase(getTrashMails.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
        builder.addCase(deleteMail.fulfilled, (state: any, action: any) => {
            state.inboxmails = state.inboxmails.filter(
                (mail: any) => mail.id !== action.payload
            );
        });
    }
});

export default EmailsSlice.reducer;