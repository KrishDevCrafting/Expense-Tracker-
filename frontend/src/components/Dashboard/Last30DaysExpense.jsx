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
    <div className="bg-white dark:bg-[#1e1e2f] p-6 rounded-2xl shadow-gray-700 dark:shadow-none border border-gray-200/50 dark:border-white/10 col-span-1">
      <div className="flex items-center justify-between">
        <h5 className="text-lg dark:text-white">Last 30 Days Expense</h5>
      </div>
      <CustomBarChart data={chartData} />
    </div>
  );
};
