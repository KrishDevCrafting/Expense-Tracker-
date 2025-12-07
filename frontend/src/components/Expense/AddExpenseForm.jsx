import React, { useState } from "react";
import Input from "../Inputs/Inputs";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddExpenseForm = ({ onAddExpense = () => {} }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setExpense((prev) => ({
      ...prev,
      [key]: value,
    }));

  const handleSubmit = () => {
    // Basic validation
    if (!expense.category || !String(expense.category).trim()) {
      alert("Category is required");
      return;
    }
    const numAmount = Number(expense.amount);
    if (!expense.amount || isNaN(numAmount) || numAmount <= 0) {
      alert("Enter a valid amount greater than 0");
      return;
    }
    if (!expense.date) {
      alert("Date is required");
      return;
    }

    // normalize and call parent handler
    onAddExpense({
      ...expense,
      amount: numAmount,
    });

    // reset form
    setExpense({
      category: "",
      amount: "",
      date: "",
      icon: "",
    });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={expense.category}
        onChange={({ target }) => handleChange("category", target.value)}
        label="Category"
        placeholder="Rent, Groceries, etc."
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder="0"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
