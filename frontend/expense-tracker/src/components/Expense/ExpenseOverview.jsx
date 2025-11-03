import React, { useState, useEffect } from "react";
import { LuPlug } from "react-icons/lu";
import { prepareExpenseBarChartData } from "../../utils/helper";
const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [charData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return <div>ExpenseOverview</div>;
};

export default ExpenseOverview;
