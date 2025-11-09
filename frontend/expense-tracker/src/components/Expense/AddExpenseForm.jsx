import React, { useState } from "react";
import Input from "../Inputs/Inputs";
import EmojiPicker from "emoji-picker-react";
const AddExpenseForm = ({ onAddExpense }) => {
  const [Income, setIncome] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setIncome({
      ...Income,
      [key]: value,
    });
  return <div>AddExpenseForm</div>;
};

export default AddExpenseForm;
