import axios from "axios";
import { DUMMY_EXPENSES } from "../data/dummy-data";

const BACKEND_URL = "";

export async function storeExpense(expense) {
  const response = await axios.post(BACKEND_URL + "/expenses.json", expense);
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  // const response = await axios.get(BACKEND_URL + "/expenses.json");

  // const expenses = [];

  // for (const key in response.data) {
  //   const expense = {
  //     id: key,
  //     amount: response.data[key].amount,
  //     date: new Date(response.data[key].date),
  //     description: response.data[key].description,
  //   };

  //   expenses.push(expense);
  // }

  // return expenses;
  return DUMMY_EXPENSES;
}

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData); // returning a promise
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
