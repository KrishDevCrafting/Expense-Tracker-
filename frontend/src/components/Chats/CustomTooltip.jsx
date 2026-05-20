import React from "react";

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 dark:bg-[#2a2a3d]/95 backdrop-blur-sm shadow-lg rounded-xl px-4 py-3 border border-gray-200/50 dark:border-white/10">
        <p className="text-xs font-semibold text-purple-700 dark:text-purple-300 mb-1">
          {payload[0].name}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Amount:{" "}
          <span className="text-sm font-bold text-gray-900 dark:text-white">
            ₹{Number(payload[0].value).toLocaleString()}
          </span>
        </p>
      </div>
    );
  }
};
