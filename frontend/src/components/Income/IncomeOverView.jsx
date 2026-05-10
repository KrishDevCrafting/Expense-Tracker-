import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Chats/CustomBarChart";
import { prepareIncomeBarChartData } from "../../utils/helper";

const IncomeOverView = ({ transaction, transactions, onAddIncome }) => {
  // support both prop names and default to empty array
  const tx = transaction ?? transactions ?? [];

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareIncomeBarChartData(tx || []);
    setChartData(result);

    return () => {};
  }, [tx]);

  return (
    <div className="bg-white dark:bg-[#1e1e2f] p-6 rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-white/10">
      <div className="flex items-start justify-between">
        <div>
          <h5 className="text-lg font-semibold dark:text-white">Income Overview</h5>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button
          type="button"
          className="flex items-center gap-1.5 text-xs md:text-sm font-medium text-purple-600 dark:text-purple-400 whitespace-nowrap bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 rounded-lg px-4 py-2 cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-500/20"
          onClick={onAddIncome}
        >
          <LuPlus className="text-lg" />
          <span className="text-sm">Add Income</span>
        </button>
      </div>

      <div className="mt-5">
        <CustomBarChart data={chartData} />
      </div>
    </div>
  );
};

export default IncomeOverView;
