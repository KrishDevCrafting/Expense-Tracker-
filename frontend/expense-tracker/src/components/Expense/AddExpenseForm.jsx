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
  return (
    <div>
      <EmojiPickerPopup
        icon={Income.icon}
        onSelect={(SelectedIcon) => handleChange("icon", SelectedIcon)}
      />

      <Input
        value={Income.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent,Groceries,etc."
        type="text"
      />

      <Input
        value={Income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />

      <Input
        value={Income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />

      <div>
        <button type="button" onClick={() => onAddExpense(Income)} className="">
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
