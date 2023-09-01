import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getInboxMails as getInboxMailsApi,
    getStarredMails as getStarredMailsApi,
    getImportantMails as getImportantMailsApi,
    getDraftMails as getDraftMailsApi,
    getSentMails as getSentMailsApi,
    getTrashMails as getTrashMailsApi,
    deleteMail as deleteMailApi
} from "../../helpers/fakebackend_helper";

export const getInboxMails = createAsyncThunk("email/getInboxMails", async () => {
    try {
        const response = getInboxMailsApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getStarredMails = createAsyncThunk("email/getStarredMails", async () => {
    try {
        const response = getStarredMailsApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getImportantMails = createAsyncThunk("email/getImportantMails", async () => {
    try {
        const response = getImportantMailsApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getDraftMails = createAsyncThunk("email/getDraftMails", async () => {
    try {
        const response = getDraftMailsApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getSentMails = createAsyncThunk("email/getSentMails", async () => {
    try {
        const response = getSentMailsApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getTrashMails = createAsyncThunk("email/getTrashMails", async () => {
    try {
        const response = getTrashMailsApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const deleteMail = createAsyncThunk("email/deletemail", async (mail: any) => {
    try {
        const response = deleteMailApi(mail);
        return response;
    } catch (error) {
        return error;
    }
})