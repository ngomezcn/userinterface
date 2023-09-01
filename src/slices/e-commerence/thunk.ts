import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getProducts as getProductsApi,
    getProductDetail as getProductDetailApi,
    getProductComents as getProductComentsApi,
    onLikeComment as onLikeCommentApi,
    getShops as getShopsApi,
    getOrders as getOrdersApi,
    deleteOrder as deleteOrderApi,
    addNewOrder as addNewOrderApi,
    updateOrder as updateOrderApi,
    getCustomers as getCustomersApi,
    addNewCustomer as addNewCustomerApi,
    updateCustomer as updateCustomerApi,
    deleteCustomer as deleteCustomerApi,
    onLikeReply as onLikeReplyApi,
    onAddReply as onAddReplyApi,
    onAddComment as onAddCommentApi,
    getCart as getCartApi,
    deleteCart as deleteCartApi,
} from "../../helpers/fakebackend_helper";

export const getProducts = createAsyncThunk("ecommerce/getProducts", async () => {
    try {
        const response = getProductsApi();
        return response;
    } catch (error) {
        return error;
    }
});

export const getProductDetail = createAsyncThunk("ecommerence/getProductDetail", async (productId: any) => {
    try {
        const response = getProductDetailApi(productId);
        return response;
    } catch (error) {
        return error;
    }
})

export const getProductComents = createAsyncThunk("ecommerence/getProductComments", async () => {
    try {
        const response = getProductComentsApi();
        return response;
    } catch (error) {
        return error;
    }
})

export const onLikeComment = createAsyncThunk("ecommerence/onlikecomment", async (productId: number, commentId: any) => {
    try {
        const response = onLikeCommentApi(commentId, productId);
        return response;
    } catch (error) {
        return error;
    }
})


export const getOrders = createAsyncThunk("ecommerence/getorder", async () => {
    try {
        const response = getOrdersApi();
        return response;
    } catch (error) {
        return error;
    }
})

export const deleteOrder = createAsyncThunk("ecommerence/deleteorder", async (orderId: any) => {
    try {
        const response = deleteOrderApi(orderId);
        return response;
    } catch (error) {
        return error;
    }
})

export const addNewOrder = createAsyncThunk("ecommerence/addorder", async (order: any) => {
    try {
        const response = addNewOrderApi(order);
        return response;
    } catch (error) {
        return error;
    }
})

export const updateOrder = createAsyncThunk("ecommerence/updateorder", async (order: any) => {
    try {
        const response = updateOrderApi(order);
        return response;
    } catch (error) {
        return error
    }
})

export const getCustomers = createAsyncThunk("ecommerence/getcustomer", async () => {
    try {
        const response = getCustomersApi();
        return response;
    } catch (error) {
        return error;
    }
})


export const addNewCustomer = createAsyncThunk("ecommerence/addcustomer", async (customer: any) => {
    try {
        const response = addNewCustomerApi(customer);
        const data = await response;
        return data;
    } catch (error) {
        return error;
    }
})

export const updateCustomer = createAsyncThunk("ecommerence/updatcustomer", async (customer: any) => {
    try {
        const response = updateCustomerApi(customer);
        const data = await response;
        return data;
    } catch (error) {
        return error
    }
})

export const deleteCustomer = createAsyncThunk("ecommerence/deletecustomer", async (customer: any) => {

    try {
        const response = deleteCustomerApi(customer);
        return response;
    } catch (error) {
        return error;
    }
})

export const getShops = createAsyncThunk("ecommerence/getshops", async () => {
    try {
        const response = getShopsApi();
        return response;
    } catch (error) {
        return error;
    }
})

export const likeReply = createAsyncThunk("ecommerence/likereply", async ({ commentId, productId, replyId }: any) => {
    try {
        const response = onLikeReplyApi(commentId, productId, replyId);
        return response;
    } catch (error) {
        return error;
    }
})

export const addReply = createAsyncThunk("ecommerence/addreply", async ({ commentId, productId, replyText }: any) => {
    try {
        const response = onAddReplyApi(commentId, productId, replyText);
        return response;
    } catch (error) {
        return error;
    }
})

export const addComment = createAsyncThunk("ecommerence/addcomment", async (productId: any, commentText: any) => {
    try {
        const response = onAddCommentApi(productId, commentText);
        return response;
    } catch (error) {
        return error;
    }
})

//cart
export const getCart = createAsyncThunk("ecommerence/getCart", async () => {
    try {
        const response = getCartApi();
        return response;
    } catch (error) {
        return error;
    }
})

export const deleteCart = createAsyncThunk("ecommerence/deleteCart", async (cart: any) => {
    try {
        const response = deleteCartApi(cart);
        return response;
    } catch (error) {
        return error;
    }
})