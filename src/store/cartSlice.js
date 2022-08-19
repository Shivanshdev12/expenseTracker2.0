import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalExpense: 0 };

const cartSlice = createSlice({
    name: "expense",
    initialState: initialCartState,
    reducers: {
        addExpense(state, action) {

        },
        removeExpense(state, action) {

        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;