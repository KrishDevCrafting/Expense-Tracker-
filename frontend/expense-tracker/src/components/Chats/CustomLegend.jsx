import React from "react";

export const CustomLegend = ({ payload }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 space-x-6">
      {payload.map((entry, index) => {
        <div
          key={`legend-${index}`}
          className="flex item-center space-x-2"
          style={{ background: entry.color }}
        ></div>;
        <span
          className="text-xs
        text-gray-700 font-medium
        "
        >
          {entry.value}
        </span>;
      })}
    </div>
  );
};
