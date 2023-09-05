import { createSlice } from "@reduxjs/toolkit";
import {
    getProducts, getProductDetail, getProductComents, onLikeComment, getOrders, deleteOrder, addNewOrder, updateOrder, getCustomers, getShops, deleteCustomer, updateCustomer, addNewCustomer, likeReply, addReply, addComment
    , getCart, deleteCart
} from './thunk';
export const initialState = {
    products: [],
    orders: [],
    sellers: [],
    customers: [],
    shops: [],
    cart: [],
    error: {},
    productComments: []
};

const EcommerceSlice = createSlice({
    name: 'EcommerceSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state: any, action: any) => {
            state.products = action.payload;
        });

        builder.addCase(getProducts.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getProductDetail.fulfilled, (state: any, action: any) => {
            state.product = action.payload;
        });

        builder.addCase(getProductDetail.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getProductComents.fulfilled, (state: any, action: any) => {
            state.productComments = action.payload;
        });

        builder.addCase(getProductComents.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(onLikeComment.fulfilled, (state: any, action: any) => {
            state.productComments = action.payload;
        })


        builder.addCase(getOrders.fulfilled, (state: any, action: any) => {
            state.orders = action.payload;
            state.isOrderCreated = false;
            state.isOrderSuccess = true;
        });

        builder.addCase(getOrders.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
            state.isOrderCreated = false;
            state.isOrderSuccess = false;
        });

        builder.addCase(addNewOrder.fulfilled, (state: any, action: any) => {
            console.log()
            state.orders.push(action.payload);
            state.isOrderCreated = true;
        });

        builder.addCase(addNewOrder.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        builder.addCase(updateOrder.fulfilled, (state: any, action: any) => {
            state.orders = state.orders.map((order: any) =>
                order.id === action.payload.id
                    ? { ...order, ...action.payload }
                    : order
            );
        });

        builder.addCase(updateOrder.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        builder.addCase(deleteOrder.fulfilled, (state: any, action: any) => {
            state.orders = state.orders.filter(
                (order: any) => order.id !== action.payload
            );
        });

        builder.addCase(deleteOrder.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getCustomers.fulfilled, (state: any, action: any) => {
            state.customers = action.payload;
            state.isCustomerCreated = false;
            state.isCustomerSuccess = true;
        });

        builder.addCase(getCustomers.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
            state.isCustomerCreated = false;
            state.isCustomerSuccess = false;
        });

        builder.addCase(addNewCustomer.fulfilled, (state: any, action: any) => {
            state.customers.push(action.payload);
            state.isCustomerCreated = true;
        });
        builder.addCase(addNewCustomer.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateCustomer.fulfilled, (state: any, action: any) => {
            state.customers = state.customers.map((customer: any) =>
                customer.id === action.payload.id
                    ? { ...customer, ...action.payload }
                    : customer
            );
        });

        builder.addCase(updateCustomer.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

        builder.addCase(deleteCustomer.fulfilled, (state: any, action: any) => {

            state.customers = state.customers.filter(
                (customer: any) => customer.id !== action.payload
            );
        });

        builder.addCase(deleteCustomer.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getShops.fulfilled, (state: any, action: any) => {
            state.shops = action.payload
        })

        builder.addCase(getShops.rejected, (state: any, action: any) => {
            state.error = action.payload
        })

        builder.addCase((likeReply || addReply || addComment).fulfilled, (state: any, action: any) => {
            state.productComments = action.payload
        })

        builder.addCase((likeReply || addReply || addComment).rejected, (state: any, action: any) => {
            state.error = action.payload
        })

        builder.addCase(getCart.fulfilled, (state: any, action: any) => {
            state.cart = action.payload;
        })
        builder.addCase(getCart.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        })
        builder.addCase(deleteCart.fulfilled, (state: any, action: any) => {
            state.cart = (state.cart || []).filter((data: any) => data.id !== action.payload);
        })
        builder.addCase(deleteCart.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        })
    }
});

export default EcommerceSlice.reducer;