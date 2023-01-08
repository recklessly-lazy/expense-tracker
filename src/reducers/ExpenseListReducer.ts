import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import store, { RootState } from "../store/store";
import { Expense } from "../models/Expense";


interface ExpenseState {
    expenses: Array<Expense>;
}

const initialState: ExpenseState = {
    // expenses: new Array<Expense>(),
    expenses: [{ amount: 100, date: new Date(), title: "Test" }],
};

export const ExpenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses.push(action.payload);
        },
    },
});

export default ExpenseSlice.reducer;

export const { addExpense } = ExpenseSlice.actions;
export const selectExpense = (state: RootState) => state.expenses.expenses;
