import React, { useEffect, useState } from "react";
import { CustomPiechart } from "../Chats/customPiechart";
const COLORS = ["#875CF5", "#FA2C37", "#FF6900", "#4f39f6"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="bg-white dark:bg-[#1e1e2f] p-6 rounded-2xl shadow-gray-100 dark:shadow-none border border-gray-200/50 dark:border-white/10">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-lg font-semibold dark:text-white">Last 60 Days Income</h5>
      </div>
      <CustomPiechart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
