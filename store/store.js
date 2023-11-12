import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import expensesReducer from "./expenses";
import authReducer from "./auth";
import budgetReducer from "./budgets";
import { composeWithDevTools } from "redux-devtools-extension";

export const store = configureStore(
  {
    reducer: {
      expenses: expensesReducer,
      auth: authReducer,
      budgets: budgetReducer,
    },
  },
  composeWithDevTools(applyMiddleware(thunkMiddleware))
);
