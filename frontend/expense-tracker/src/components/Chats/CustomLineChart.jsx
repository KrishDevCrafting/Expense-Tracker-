import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload || {};
    const label = item.category || item.name || "";
    const amount = item.amount ?? item.value ?? 0;

    return (
      <div className="bg-white p-2 rounded shadow-sm border">
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-gray-600">
          Amount: <span className="font-medium">₹{amount}</span>
        </p>
      </div>
    );
  }
  return null;
};

const CustomLineChart = ({ data = [] }) => {
  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAmt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875CF5" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#875CF5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#666" }} />
          <YAxis tick={{ fontSize: 12, fill: "#666" }} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875CF5"
            fill="url(#colorAmt)"
            strokeWidth={2}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
