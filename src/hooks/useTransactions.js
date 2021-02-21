import { useContext } from "react";
import { ExpenseTrackerContext } from "../context/context";
import {
  expenseCategories,
  incomeCategories,
  resetCategories
} from "../constants/categories";

const useTransactions = (title) => {
  resetCategories();
  const { transactions } = useContext(ExpenseTrackerContext);
  let transactionType = transactions.filter((t) => t.type === title);
  let total = transactionType.reduce(
    (acc, currentVal) => (acc += currentVal.amount),
    0
  );
  let categories = title === "Income" ? incomeCategories : expenseCategories;

  transactionType.forEach((t) => {
    const category = categories.find((c) => c.type === t.category);

    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter((c) => c.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map((t) => t.amount),
        backgroundColor: filteredCategories.map((t) => t.color)
      }
    ],
    labels: filteredCategories.map((t) => t.type)
  };

  return { total, chartData };
};

export default useTransactions;
