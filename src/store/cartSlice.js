import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalExpense: 0 };

const cartSlice = createSlice({
    name: "expense",
    initialState: initialCartState,
    reducers: {
        replaceExpense(state, action) {
            state.items = action.payload.items;
            state.totalExpense = action.payload.totalExpense;
        },
        addExpense(state, action) {
            const expense = action.payload.expense;
            const description = action.payload.description;
            const category = action.payload.category;
            state.items.push({
                expense,
                description,
                category
            });
        },
        removeExpense(state, action) {

        }
    }
});

export const cartActions = cartSlice.actions;

export default cartSlice;