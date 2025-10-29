import React, { useState } from "react";
import Input from "../Inputs/Inputs";
import EmojiPickerPopup from "../EmojiPickerPopup";

const AddIncomeForm = ({ onAddIncome }) => {
  const [income, setIncome] = useState({
    source: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setIncome({
      ...income,
      [key]: value,
    });

  const handleSubmit = () => {
    // basic validation
    if (!income.source || !String(income.source).trim()) {
      alert("Source is required");
      return;
    }
    if (!income.amount || isNaN(Number(income.amount)) || Number(income.amount) <= 0) {
      alert("Enter a valid amount");
      return;
    }
    if (!income.date) {
      alert("Date is required");
      return;
    }

    // call parent handler with normalized data
    onAddIncome &&
      onAddIncome({
        ...income,
        amount: Number(income.amount),
      });

    // reset form
    setIncome({ source: "", amount: "", date: "", icon: "" });
  };

  return (
    <div>
      <EmojiPickerPopup
        icon={income.icon}
        onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
      />

      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="Income Source"
        placeholder="Freelance,Salary,etc."
        type="text"
      />
      <Input
        value={income.amount}
        onChange={({ target }) => handleChange("amount", target.value)}
        label="Amount"
        placeholder=""
        type="number"
      />
      <Input
        value={income.date}
        onChange={({ target }) => handleChange("date", target.value)}
        label="Date"
        placeholder=""
        type="date"
      />
      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn bg-purple-600 text-white p-2 rounded hover:bg-purple-500"
          onClick={handleSubmit}
        >
          Add Income
        </button>
      </div>
    </div>
  );
};

export default AddIncomeForm;
