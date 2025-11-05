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

  return (
    <>
      <div className="bg-white p-6 rounded-2xl shadow-gray-100 border-gray-200/50">
        <div className="flex item-centerjustify-between">
          <div className="">
            <h5>Expense Overview</h5>
            <p className="text-xs text-gray-400 mt-0.5">
              Track your spending trends over time and gain insights your money
              goes.
            </p>
          </div>
          <button className="" onClick={onExpenseIncome}>
            <LuPlug className="text-lg" />
            Add Expense
          </button>
        </div>
      </div>
    </>
  );
};

export default ExpenseOverview;
