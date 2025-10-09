import React from "react";

export const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-md rounded-lg p-2 border-gray-300">
        <p
          className="text-xs font-semibold
        text-purple-800 mb-1
        "
        >
          {payload[0].name}
        </p>
        <p className="">
          Amount:
          <span className="">${payload[0].value}</span>
        </p>
      </div>
    );
  }
};
