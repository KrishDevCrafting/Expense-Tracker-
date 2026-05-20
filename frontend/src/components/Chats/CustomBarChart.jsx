import React, { useContext } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Cell,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";

const CustomBarChart = ({ data = [] }) => {
  const { darkMode } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = React.useState(null);

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
      : null;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload || {};
      const label =
        (xKey && item[xKey]) || item.source || item.category || item.name || "";
      const amount = item.amount ?? item.value ?? 0;

      return (
        <div
          className="backdrop-blur-xl rounded-xl px-4 py-3 border shadow-2xl"
          style={{
            background: darkMode
              ? "rgba(30,30,47,0.95)"
              : "rgba(255,255,255,0.95)",
            borderColor: darkMode
              ? "rgba(139,92,246,0.3)"
              : "rgba(139,92,246,0.2)",
            boxShadow: "0 8px 32px rgba(139,92,246,0.15)",
          }}
        >
          <p
            className="text-xs font-semibold mb-1"
            style={{ color: "#a78bfa" }}
          >
            {label}
          </p>
          <p className="text-lg font-bold" style={{ color: darkMode ? "#fff" : "#1f2937" }}>
            ${Number(amount).toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-6">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data || []}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex !== undefined) {
              setActiveIndex(state.activeTooltipIndex);
            }
          }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity={1} />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.8} />
            </linearGradient>
            <linearGradient id="barGradientActive" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c4b5fd" stopOpacity={1} />
              <stop offset="100%" stopColor="#8b5cf6" stopOpacity={1} />
            </linearGradient>
            <filter id="barGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feFlood floodColor="#8b5cf6" floodOpacity="0.3" />
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
            dataKey={xKey || "source"}
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
          <Tooltip content={<CustomTooltip />} cursor={false} />

          <Bar
            dataKey="amount"
            radius={[8, 8, 4, 4]}
            maxBarSize={40}
            animationBegin={0}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {(data || []).map((entry, index) => (
              <Cell
                key={`bar-${index}`}
                fill={
                  activeIndex === index
                    ? "url(#barGradientActive)"
                    : "url(#barGradient)"
                }
                style={{
                  filter: activeIndex === index ? "url(#barGlow)" : "none",
                  opacity:
                    activeIndex !== null && activeIndex !== index ? 0.45 : 1,
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                }}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;
