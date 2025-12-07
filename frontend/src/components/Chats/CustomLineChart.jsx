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

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload || {};
    const amount = item.amount ?? item.value ?? 0;

    return (
      <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
        <p className="text-xs font-semibold text-purple-800">{label}</p>
        <p className="text-sm text-gray-600">
          Amount:{" "}
          <span className="text-sm font-medium text-gray-900">₹{amount}</span>
        </p>
      </div>
    );
  }

  return null;
};

const CustomLineChart = ({ data = [] }) => {
  const xKey = React.useMemo(() => {
    if (!Array.isArray(data) || data.length === 0) return "name";
    const first = data[0] || {};
    if ("month" in first) return "month";
    if ("name" in first) return "name";
    if ("category" in first) return "category";
    const keys = Object.keys(first);
    return keys.length ? keys[0] : "name";
  }, [data]);

  return (
    <div className="w-full h-60">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data || []}
          margin={{ top: 6, right: 12, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#875CF5" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#875CF5" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="none" vertical={false} />
          <XAxis dataKey={xKey} tick={{ fontSize: 12, fill: "#555" }} />
          <YAxis tick={{ fontSize: 12, fill: "#555" }} />
          <Tooltip
            content={<CustomTooltip />}
            formatter={(value) => `₹${value}`}
            labelFormatter={(lbl) => lbl}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="#875CF5"
            fill="url(#incomeGradient)"
            strokeWidth={3}
            dot={{ r: 3, fill: "#ab8df8" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
