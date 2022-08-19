import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import authSlice from "./authSlice";
import themeSlice from "./themeSlice";

const store = configureStore({
    reducer: {
        expense: cartSlice.reducer,
        auth: authSlice.reducer,
        theme: themeSlice.reducer
    }
});

export default store;