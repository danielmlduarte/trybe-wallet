export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const LIST_CURRENCIES = 'LIST_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const REMOVE_EXPENSE = 'REMOVE_EXPENSE';
export const LOGIN = 'LOGIN';
export const TOTAL_EXPENSE = 'TOTAL_EXPENSE';

export const userLogin = (email) => ({
  type: LOGIN,
  email,
});

export const addExpense = (expense) => ({
  type: ADD_EXPENSE,
  payload: expense,
});

export const removeExpense = (expenseId) => ({
  type: REMOVE_EXPENSE,
  payload: expenseId,
});

export const totalExpenses = (totalValue) => ({
  type: TOTAL_EXPENSE,
  payload: totalValue,
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

export const failedRequest = (error) => ({
  type: REQUEST_FAILED,
  error,
});

export const listCurrencies = (currencies) => ({
  type: LIST_CURRENCIES,
  payload: currencies,
});
