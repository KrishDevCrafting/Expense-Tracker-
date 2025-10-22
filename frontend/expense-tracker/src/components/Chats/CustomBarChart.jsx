import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const CustomBarChart = ({ data = [] }) => {
  // determine x-axis key from first item (fallbacks)
  const xKey =
    data && data.length
      ? "source" in data[0] // Check 1: Does "source" exist?
        ? "source"
        : "month" in data[0] // Check 2: Does "month" exist?
        ? "month"
        : "name" in data[0] // Check 3: Does "name" exist?
        ? "name"
        : "category" in data[0] // Check 4: Does "category" exist?
        ? "category"
        : null // If none exist
      : null; // If data is empty

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload || {};

      // 👇 MODIFIED: Added item.source as a fallback
      const label =
        (xKey && item[xKey]) || item.source || item.category || item.name || "";
      const amount = item.amount ?? item.value ?? 0;

      return (
        <div className="bg-white shadow-md rounded-lg p-2 border">
          <p className="text-xs font-semibold text-purple-800 mb-1">{label}</p>
          <p className="text-sm text-gray-600">
            Amount:
            <span className="text-sm font-medium text-gray-900">₹{amount}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data || []}>
          <CartesianGrid stroke="none" />
          <XAxis
            // 👇 MODIFIED: Changed fallback from "name" to "source"
            dataKey={xKey || "source"}
            tick={{ fontSize: 12, fill: "#555" }}
          />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke="none" />
          <Tooltip content={<CustomTooltip />} />

          <Bar dataKey="amount" fill="#875cf5" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
