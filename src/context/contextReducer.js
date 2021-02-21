import { CONSTANTS } from "./types";

const addTransaction = (payload, state) => {
  return [...state, payload];
};

const deleteTransaction = (payload, state) => {
  return [...state.filter((transaction) => transaction.id !== payload)];
};

export default (state, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_TRANSACTION:
      return addTransaction(action.payload, state);
    case CONSTANTS.DELETE_TRANSACTION:
      return deleteTransaction(action.payload, state);
    default:
      return state;
  }
};
