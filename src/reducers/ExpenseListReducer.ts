import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import store, { RootState } from "../store/store";
import { Expense } from "../models/Expense";

interface ExpenseState {
    expenses: Array<Expense>;
}

const initialState: ExpenseState = {
    expenses: new Array<Expense>(),
    // expenses: [{ amount: 100, date: new Date().toISOString(), title: "Test", }],
};

export const ExpenseSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<Expense>) => {
            console.log("adding new expense");
            state.expenses.push(action.payload);
        },
        removeExpense: (state, action: PayloadAction<Expense>) => {
            state.expenses = state.expenses.filter(
                (expense) => expense.id !== action.payload.id
            );
        },
        initExpenses: (state, action: PayloadAction<Array<Expense>>) => {
            console.log("init expenses =", action);

            state.expenses = action.payload;
        },
    },
});

export default ExpenseSlice.reducer;

export const { addExpense, removeExpense, initExpenses } = ExpenseSlice.actions;
export const selectExpense = (state: RootState) => state.expenses.expenses;
