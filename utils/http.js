import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DUMMY_EXPENSES } from "../data/dummy-data";
import expenses, {
  addExpense,
  updateExpense as updateExp,
  deleteExpense as deleteExp,
  initExpensesFailure,
  initExpensesStart,
  initExpensesSuccess,
} from "../store/expenses";
import {
  authenticateFailure,
  authenticateStart,
  authenticateSuccess,
} from "../store/auth";
import {
  addBudget,
  updateBudget as updateBudg,
  deleteBudget as deleteBudg,
  initBudgetsFailure,
  initBudgetsStart,
  initBudgetsSuccess,
} from "../store/budgets";

const BACKEND_URL = process.env.EXPO_PUBLIC_BACKEND_URL;

export function storeExpense(expense, onActionComplete) {
  return async function storeExpensesThunk(dispatch, getState) {
    const response = await axios.post(
      BACKEND_URL +
        "/expenses/" +
        getState().auth.userInfo.uid +
        ".json?auth=" +
        getState().auth.token,
      expense
    );
    const id = response.data.name;

    dispatch(addExpense({ ...expense, id: id }));
    onActionComplete();
  };
}

export function initializeExpenses(userId) {
  return async function initializeExpensesThunk(dispatch, getState) {
    dispatch(initExpensesStart());

    try {
      const response = await axios.get(
        BACKEND_URL +
          "/expenses/" +
          getState().auth.userInfo.uid +
          ".json?auth=" +
          getState().auth.token
      );

      const expenses = [];

      for (const key in response.data) {
        const expense = {
          id: key,
          name: response.data[key].name,
          amount: response.data[key].amount,
          date: new Date(response.data[key].date).toISOString(),
          type: response.data[key].type,
          category: response.data[key].category,
          budget: response.data[key].budget,
          description: response.data[key].description,
          items: response.data[key].items,
        };

        expenses.push(expense);
      }

      expenses.sort((a, b) => new Date(b.date) - new Date(a.date));

      const categories = await fetchCategories(getState().auth.token);

      dispatch(initExpensesSuccess({ expenses, categories }));
    } catch (error) {
      console.log("initExpenses: " + error.message);
      dispatch(initExpensesFailure("Could not retrieve expenses"));
    }
  };
}

export function updateExpense(id, expenseData, onActionComplete) {
  return async function updateExpensesThunk(dispatch, getState) {
    dispatch(initExpensesStart());
    await axios.put(
      BACKEND_URL +
        `expenses/${getState().auth.userInfo.uid}/${id}.json?auth=${
          getState().auth.token
        }`,
      expenseData
    );

    dispatch(updateExp({ ...expenseData, id }));
    onActionComplete();
  };
}

export function deleteExpense(id, onActionComplete) {
  return async function deleteExpensesThunk(dispatch, getState) {
    dispatch(initExpensesStart());
    await axios.delete(
      BACKEND_URL +
        `expenses/${getState().auth.userInfo.uid}/${id}.json?auth=${
          getState().auth.token
        }`
    );

    dispatch(deleteExp(id));
    onActionComplete();
  };
}

export function storeBudget(budget, onActionComplete) {
  return async function storeBudgetThunk(dispatch, getState) {
    dispatch(initBudgetsStart());
    try {
      const response = await axios.post(
        BACKEND_URL +
          "/budgets/" +
          getState().auth.userInfo.uid +
          ".json?auth=" +
          getState().auth.token,
        budget
      );
      const id = response.data.name;

      dispatch(addBudget({ ...budget, id: id }));
      onActionComplete();
    } catch (error) {
      console.log("updateBudget: " + error.message);
      dispatch(initBudgetsFailure("Could not update budget"));
    }
  };
}

export function initializeBudgets() {
  return async function initializeBudgetsThunk(dispatch, getState) {
    dispatch(initBudgetsStart());

    try {
      const response = await axios.get(
        BACKEND_URL +
          "/budgets/" +
          getState().auth.userInfo.uid +
          ".json?auth=" +
          getState().auth.token
      );

      const budgets = [];

      for (const key in response.data) {
        const budget = {
          id: key,
          name: response.data[key].name,
          amount: response.data[key].amount,
          date: new Date(response.data[key].date).toISOString(),
          category: response.data[key].category,
        };

        budgets.push(budget);
      }

      budgets.sort((a, b) => new Date(b.date) - new Date(a.date));

      dispatch(initBudgetsSuccess({ budgets }));
    } catch (error) {
      console.log("initBudgets: " + error.message);
      dispatch(initBudgetsFailure("Could not retrieve budgets"));
    }
  };
}

export function updateBudget(id, budgetData, onActionComplete) {
  return async function updateBudgetThunk(dispatch, getState) {
    dispatch(initBudgetsStart());
    try {
      await axios.put(
        BACKEND_URL +
          `budgets/${getState().auth.userInfo.uid}/${id}.json?auth=${
            getState().auth.token
          }`,
        budgetData
      );

      dispatch(updateBudg({ ...budgetData, id }));
      onActionComplete();
    } catch (error) {
      console.log("updateBudget: " + error.message);
      dispatch(initBudgetsFailure("Could not update budget"));
    }
  };
}

export function deleteBudget(id, onActionComplete) {
  return async function deleteBudgetThunk(dispatch, getState) {
    dispatch(initBudgetsStart());
    try {
      await axios.delete(
        BACKEND_URL +
          `budgets/${getState().auth.userInfo.uid}/${id}.json?auth=${
            getState().auth.token
          }`
      );

      dispatch(deleteBudg(id));
      onActionComplete();
    } catch (error) {
      console.log("deleteBudget: " + error.message);
      dispatch(initBudgetsFailure("Could not delete budget"));
    }
  };
}

export async function fetchCategories(token) {
  try {
    const response = await axios.get(
      BACKEND_URL + "categories.json?auth=" + token
    );

    const categories = [];

    response.data
      .filter((item) => item !== null)
      .sort((a, b) => a.localeCompare(b))
      .forEach((item, index) => {
        const category = {
          key: index, // setting id to the index of current iteration
          value: item,
        };

        categories.push(category);
      });

    return categories;
  } catch (error) {
    console.log("FetchCategories: " + error.message);
  }
}

function authenticate(mode, email, password) {
  return async function authenticateThunk(dispatch, getState) {
    dispatch(authenticateStart());
    try {
      const url = `${process.env.EXPO_PUBLIC_API_URL}/v1/accounts:${mode}?key=${process.env.EXPO_PUBLIC_API_KEY}`;
      const response = await axios.post(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      });

      const expiry = getNewExpiry(+response.data.expiresIn);

      AsyncStorage.setItem("refreshToken", response.data.refreshToken);
      AsyncStorage.setItem("tokenExpiry", expiry.getTime().toString());

      dispatch(
        authenticateSuccess({
          token: response.data.idToken,
          uid: response.data.localId,
        })
      );
    } catch (error) {
      console.log("Authenticate: " + error.message);
      dispatch(authenticateFailure("Error authenticating email & password"));
    }
  };
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export async function isLoginTokenValid() {
  const tokenExpiry = await AsyncStorage.getItem("tokenExpiry");
  const now = new Date();
  const expiryDate = new Date();

  if (tokenExpiry) {
    expiryDate.setTime(+tokenExpiry);
    if (now < expiryDate) {
      return true;
    }
  }

  return false;
}

export function loginWithToken() {
  return async function loginWithTokenThunk(dispatch, getState) {
    dispatch(authenticateStart());
    try {
      const isTokenValid = await isLoginTokenValid();
      if (!isTokenValid) {
        clearStorage();
        dispatch(authenticateFailure("Invalid login token"));
        return;
      }

      const refreshToken = await AsyncStorage.getItem("refreshToken");
      const response = await axios.post(
        process.env.EXPO_PUBLIC_API_URL +
          "/v1/token?key=" +
          process.env.EXPO_PUBLIC_API_KEY,
        "grant_type=refresh_token&refresh_token=" + refreshToken,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const expiry = getNewExpiry(+response.data.expires_in);

      AsyncStorage.setItem("refreshToken", response.data.refresh_token);
      AsyncStorage.setItem("tokenExpiry", expiry.getTime().toString());

      dispatch(
        authenticateSuccess({
          token: response.data.id_token,
          uid: response.data.user_id,
        })
      );
    } catch (error) {
      console.log("LoginWithToken: " + error.message);
      dispatch(authenticateFailure(error.message));
    }
  };
}

export function clearStorage() {
  AsyncStorage.multiRemove(["refreshToken", "tokenExpiry"]);
}

function getNewExpiry(data) {
  const expiry = new Date();
  expiry.setTime(expiry.getTime() + data * 1000);
  return expiry;
}
