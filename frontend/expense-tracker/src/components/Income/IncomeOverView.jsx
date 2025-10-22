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
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-start justify-between">
        <div>
          <h5 className="text-lg font-semibold">Income Overview</h5>
          <p className="text-sm text-gray-500">
            Track your earnings over time and analyze your income trends.
          </p>
        </div>

        <button
          type="button"
          className="flex item-center gap-1.5 text-xs md:text-sm font-medium text-puple-600 whitespace-nowrap bg--puple-50 border-purple-100 rounded-lg px-4 py-2 cursor-pointer"
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
