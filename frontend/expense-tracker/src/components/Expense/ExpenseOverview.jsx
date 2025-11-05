import React, { useState, useEffect } from "react";
import { LuPlug } from "react-icons/lu";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomLineChart from "../Chats/CustomLineChart";

const ExpenseOverview = ({ transactions = [], onExpenseIncome }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions);
    setChartData(result);
    return () => {};
  }, [transactions]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/50">
      <div className="flex items-start justify-between">
        <div>
          <h5 className="text-lg font-semibold">Expense Overview</h5>
          <p className="text-sm text-gray-500 mt-1">
            Track your spending trends over time and see where your money goes.
          </p>
        </div>

        <button
          type="button"
          onClick={onExpenseIncome}
          className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition"
        >
          <LuPlug className="text-lg" />
          <span className="text-sm font-medium">Add Expense</span>
        </button>
      </div>

      <div className="mt-6">
        <CustomLineChart data={chartData} />
      </div>
    </div>
  );
};

export default ExpenseOverview;
