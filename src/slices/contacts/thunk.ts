import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getUsers as getUsersApi,
    deleteUsers as deleteUsersApi,
    getUserProfile as getUserProfileApi,
    addNewUser as addNewUserApi,
    updateUser as updateUserApi
} from "../../helpers/fakebackend_helper"

export const getUsers = createAsyncThunk("contacts/getUsers", async () => {

    try {
        const response = getUsersApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const deleteUsers = createAsyncThunk("contacts/deleteUsers", async (users: any) => {
    try {
        const response = deleteUsersApi(users);
        return response;
    } catch (error) {
        return error;
    }
})

export const addNewUser = createAsyncThunk("ecommerence/addcustomer", async (customer: any) => {
    try {
        const response = addNewUserApi(customer);
        const data = await response;
        return data;
    } catch (error) {
        return error;
    }
})

export const updateUser = createAsyncThunk("ecommerence/updatcustomer", async (customer: any) => {
    try {
        const response = updateUserApi(customer);
        const data = await response;
        return data;
    } catch (error) {
        return error
    }
})

export const getUserProfile = createAsyncThunk("contacts/getUserProfile", async () => {
    try {
        const response = getUserProfileApi();
        return response;
    } catch (error) {
        return error;
    }
})
