import React, { useState } from "react";
import Income from "../../Dashboard/Income";

const AddIncomeForm = ({ AddIncomeForm }) => {
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

  return (
    <div>
      <Input
        value={income.source}
        onChange={({ target }) => handleChange("source", target.value)}
        label="income source"
        placeholder="Freelance,salary,etc."
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

      
    </div>
  );
};

export default AddIncomeForm;
