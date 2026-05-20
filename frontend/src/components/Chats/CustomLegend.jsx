import React from "react";

export const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mt-6">
      {payload.map((entry, index) => (
        <div
          key={`legend-${index}`}
          className="flex items-center gap-2 bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full border border-gray-100 dark:border-white/10"
        >
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: entry.color }}
          ></div>
          <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
            {entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};
