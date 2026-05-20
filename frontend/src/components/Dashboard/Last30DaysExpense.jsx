import React, { useEffect, useState } from "react";
import { prepareExpenseBarChartData } from "../../utils/helper";
import CustomBarChart from "../Chats/CustomBarChart";

export const Last30DaysExpense = ({ data }) => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(data);
    setChartData(result);
    return () => {};
  }, [data]);

  return (
    <div className="card relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div
        className="absolute -bottom-16 -right-16 w-32 h-32 rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #7C3AED 0%, transparent 70%)",
        }}
      />

      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-bold dark:text-white">
            Last 30 Days Expense
          </h5>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Spending trend overview
          </p>
        </div>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(124,58,237,0.04))",
          }}
        >
          <span className="text-sm">📉</span>
        </div>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  );
};
