import { createSlice } from "@reduxjs/toolkit";

import { getWallet, getCryptoOrderList, getWalletActivities } from './thunk';

export const initialState = {
    wallet: [],
    walletActivities: [],
    cryptoOrders: [],
    error: {},
};


const CryptoSlice = createSlice({
    name: 'CryptoSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getWallet.fulfilled, (state: any, action: any) => {
            state.wallet = action.payload;
        });

        builder.addCase(getWallet.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getCryptoOrderList.fulfilled, (state: any, action: any) => {
            state.cryptoOrders = action.payload;
        });

        builder.addCase(getCryptoOrderList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getWalletActivities.fulfilled, (state: any, action: any) => {
            state.walletActivities = action.payload;
        })
        builder.addCase(getWalletActivities.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

    }
})

export default CryptoSlice.reducer;
