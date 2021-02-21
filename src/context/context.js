import React, { createContext, useReducer } from "react";
import contextReducer from "./contextReducer";
import { CONSTANTS } from "./types";

const initialState = [];

export const ExpenseTrackerContext = createContext();

const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  //handle adding transaction
  const addTransaction = (transaction) => {
    dispatch({
      type: CONSTANTS.ADD_TRANSACTION,
      payload: transaction
    });
  };

  //handle deleting transaction
  const deleteTransaction = (id) => {
    console.log(id);
    dispatch({
      type: CONSTANTS.DELETE_TRANSACTION,
      payload: id
    });
  };
  return (
    <ExpenseTrackerContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction
      }}
    >
      {children}
    </ExpenseTrackerContext.Provider>
  );
};

export default Provider;
