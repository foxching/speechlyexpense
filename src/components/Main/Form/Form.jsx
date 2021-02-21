import React, { useState, useContext } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
  TextField,
  Typography,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import useStyles from "./styles";
import { ExpenseTrackerContext } from "../../../context/context";
import {
  incomeCategories,
  expenseCategories
} from "../../../constants/categories";
import formatDate from "../../../utils/formatDate";

const initialState = {
  type: "Income",
  category: "",
  amount: "",
  date: formatDate(new Date())
};

const Form = () => {
  const [formData, setFormData] = useState(initialState);
  const { addTransaction } = useContext(ExpenseTrackerContext);
  const classes = useStyles();
  const { segments } = useSpeechContext();

  const selectedCategories =
    formData.type === "Income" ? incomeCategories : expenseCategories;

  const handleAddTransaction = () => {
    const newTransaction = {
      id: uuidv4(),
      ...formData
    };

    addTransaction(newTransaction);
    setFormData(initialState);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography align="center" variant="subtitle2" gutterBottom>
          {segments && segments.words.map((w) => w.value.join(""))}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
          >
            <MenuItem value="Income">Income</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
          >
            {selectedCategories.map((category) => (
              <MenuItem key={category.type} value={category.type}>
                {category.type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="number"
          label="Amount"
          fullWidth
          value={formData.amount}
          onChange={(e) =>
            setFormData({ ...formData, amount: Number(e.target.value) })
          }
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          type="date"
          label="Date"
          fullWidth
          value={formData.date}
          onChange={(e) =>
            setFormData({ ...formData, date: formatDate(e.target.value) })
          }
        />
      </Grid>
      <Button
        variant="outlined"
        fullWidth
        className={classes.button}
        color="primary"
        onClick={handleAddTransaction}
      >
        Create
      </Button>
    </Grid>
  );
};

export default Form;
