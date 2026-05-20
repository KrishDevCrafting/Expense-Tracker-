import React from "react";
import { CustomPiechart } from "../Chats/customPiechart";

const COLORS = ["#8B5CF6", "#F43F5E", "#F97316"];

export const FinanceOverview = ({
  totalBalance,
  totalIncome,
  totalExpense,
}) => {
  const balanceData = [
    { name: "Total Balance", amount: Math.abs(totalBalance) },
    { name: "Total Expense", amount: totalExpense },
    { name: "Total Income", amount: totalIncome },
  ];

  return (
    <div className="card relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div
        className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
        }}
      />

      <div className="flex items-center justify-between mb-2">
        <div>
          <h5 className="text-lg font-bold dark:text-white">
            Finance Overview
          </h5>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Income vs Expense breakdown
          </p>
        </div>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(139,92,246,0.12), rgba(139,92,246,0.04))",
          }}
        >
          <span className="text-sm">📊</span>
        </div>
      </div>

      <CustomPiechart
        data={balanceData}
        label="Total Balance"
        totalAmount={`₹${totalBalance.toLocaleString()}`}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};
