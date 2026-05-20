import React, { useEffect, useState } from "react";
import { CustomPiechart } from "../Chats/customPiechart";

const COLORS = ["#8B5CF6", "#A78BFA", "#C4B5FD", "#6D28D9"];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));
    setChartData(dataArr || []);
  };

  useEffect(() => {
    prepareChartData();
    return () => {};
  }, [data]);

  return (
    <div className="card relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #A78BFA 0%, transparent 70%)",
        }}
      />

      <div className="flex items-center justify-between mb-2">
        <div>
          <h5 className="text-lg font-bold dark:text-white">
            Last 60 Days Income
          </h5>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Top income sources breakdown
          </p>
        </div>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(167,139,250,0.12), rgba(167,139,250,0.04))",
          }}
        >
          <span className="text-sm">💰</span>
        </div>
      </div>

      <CustomPiechart
        data={chartData}
        label="Total Income"
        totalAmount={`$${Number(totalIncome).toLocaleString()}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
