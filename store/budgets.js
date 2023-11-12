import { createSlice } from "@reduxjs/toolkit";

export const budgetSlice = createSlice({
  name: "budgets",
  initialState: {
    budgets: [],
    loading: false,
    error: {
      status: false,
      message: "",
    },
  },
  reducers: {
    addBudget: (state, action) => {
      state.budgets.push(action.payload);
      state.budgets.sort((a, b) => new Date(b.date) - new Date(a.date));
      state.loading = false;
      state.error = {
        status: false,
        message: "",
      };
    },
    deleteBudget: (state, action) => {
      const index = state.budgets.findIndex(
        (budget) => budget.id === action.payload
      );
      if (index > -1) {
        state.budgets.splice(index, 1);
      }

      state.loading = false;
      state.error = {
        status: false,
        message: "",
      };
    },
    updateBudget: (state, action) => {
      const index = state.budgets.findIndex(
        (budget) => budget.id === action.payload.id
      );
      if (index !== -1) {
        state.budgets[index] = action.payload;
      }

      state.budgets.sort((a, b) => new Date(b.date) - new Date(a.date));

      state.loading = false;
      state.error = {
        status: false,
        message: "",
      };
    },
    initBudgetsStart: (state, action) => {
      state.loading = true;
      state.error = {
        status: false,
        message: "",
      };
    },
    initBudgetsSuccess: (state, action) => {
      state.loading = false;
      state.error = {
        status: false,
        message: "",
      };
      state.budgets = action.payload.budgets;
    },
    initBudgetsFailure: (state, action) => {
      state.loading = false;
      state.error = {
        status: true,
        message: action.payload,
      };
    },
  },
});

export const {
  addBudget,
  deleteBudget,
  updateBudget,
  initBudgetsStart,
  initBudgetsSuccess,
  initBudgetsFailure,
} = budgetSlice.actions;

export default budgetSlice.reducer;
