import React, { useContext } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";

const CustomTooltip = ({ active, payload, label, darkMode }) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload || {};
    const amount = item.amount ?? item.value ?? 0;

    return (
      <div
        className="backdrop-blur-xl rounded-xl px-4 py-3 border shadow-2xl"
        style={{
          background: darkMode
            ? "rgba(30,30,47,0.95)"
            : "rgba(255,255,255,0.95)",
          borderColor: "rgba(139,92,246,0.3)",
          boxShadow: "0 8px 32px rgba(139,92,246,0.15)",
        }}
      >
        <p className="text-xs font-semibold mb-1" style={{ color: "#a78bfa" }}>
          {label}
        </p>
        <p
          className="text-lg font-bold"
          style={{ color: darkMode ? "#fff" : "#1f2937" }}
        >
          ₹{Number(amount).toLocaleString()}
        </p>
      </div>
    );
  }

  return null;
};

const CustomLineChart = ({ data = [] }) => {
  const { darkMode } = useContext(ThemeContext);

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
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data || []}
          margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.35} />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="50%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </linearGradient>
            <filter id="dotGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodColor="#8b5cf6" floodOpacity="0.5" />
              <feComposite in2="blur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <CartesianGrid
            stroke={darkMode ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.05)"}
            strokeDasharray="3 3"
            vertical={false}
          />
          <XAxis
            dataKey={xKey}
            tick={{
              fontSize: 11,
              fill: darkMode ? "#6b7280" : "#9ca3af",
              fontWeight: 500,
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{
              fontSize: 11,
              fill: darkMode ? "#6b7280" : "#9ca3af",
              fontWeight: 500,
            }}
            axisLine={false}
            tickLine={false}
            width={50}
          />
          <Tooltip
            content={<CustomTooltip darkMode={darkMode} />}
            cursor={{
              stroke: darkMode
                ? "rgba(139,92,246,0.15)"
                : "rgba(139,92,246,0.1)",
              strokeWidth: 1,
              strokeDasharray: "4 4",
            }}
          />
          <Area
            type="monotone"
            dataKey="amount"
            stroke="url(#lineStroke)"
            fill="url(#areaGradient)"
            strokeWidth={3}
            dot={{
              r: 4,
              fill: darkMode ? "#1e1e2f" : "#fff",
              stroke: "#8b5cf6",
              strokeWidth: 2,
            }}
            activeDot={{
              r: 7,
              fill: "#8b5cf6",
              stroke: darkMode ? "#1e1e2f" : "#fff",
              strokeWidth: 3,
              filter: "url(#dotGlow)",
            }}
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
