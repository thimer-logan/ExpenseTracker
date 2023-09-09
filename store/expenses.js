import { createSlice } from "@reduxjs/toolkit";

export const expensesSlice = createSlice({
  name: "expenses",
  initialState: {
    expenses: [],
    loading: false,
  },
  reducers: {
    addExpense: (state, action) => {
      state.loading = false;
      state.expenses.push(action.payload);
      state.expenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    },
    deleteExpense: (state, action) => {
      state.loading = false;
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload
      );
      if (index > -1) {
        state.expenses.splice(index, 1);
      }
    },
    updateExpense: (state, action) => {
      const index = state.expenses.findIndex(
        (expense) => expense.id === action.payload.id
      );
      if (index !== -1) {
        state.expenses[index] = action.payload;
      }

      state.expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

      state.loading = false;
    },
    initExpensesStart: (state, action) => {
      state.loading = true;
    },
    initExpensesSuccess: (state, action) => {
      state.loading = false;
      state.expenses = action.payload; // replace current state with fetched expenses
    },
    initExpensesFailure: (state, action) => {
      //state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addExpense,
  deleteExpense,
  updateExpense,
  initExpensesStart,
  initExpensesSuccess,
  initExpensesFailure,
} = expensesSlice.actions;

export default expensesSlice.reducer;
