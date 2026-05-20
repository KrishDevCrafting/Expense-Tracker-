import React, { useContext, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ThemeContext } from "../../context/ThemeContext";

const CustomTooltipContent = ({ active, payload, colors }) => {
  if (active && payload && payload.length) {
    const color = payload[0].payload?.fill || colors?.[0] || "#8B5CF6";
    return (
      <div
        className="backdrop-blur-xl rounded-xl px-4 py-3 border shadow-2xl"
        style={{
          background: `linear-gradient(135deg, rgba(30,30,47,0.95), rgba(30,30,47,0.85))`,
          borderColor: color,
          borderWidth: "1px",
          boxShadow: `0 8px 32px ${color}33, 0 0 0 1px ${color}22`,
        }}
      >
        <div className="flex items-center gap-2 mb-1">
          <div
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: color,
              boxShadow: `0 0 8px ${color}88`,
            }}
          />
          <p className="text-xs font-semibold text-white/90">
            {payload[0].name}
          </p>
        </div>
        <p className="text-lg font-bold text-white pl-4">
          ₹{Number(payload[0].value).toLocaleString()}
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegendContent = ({ data, colors, activeIndex, onHover }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 mt-8">
      {data.map((entry, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={`legend-${index}`}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full cursor-pointer transition-all duration-300"
            style={{
              background: isActive
                ? `${colors[index % colors.length]}18`
                : "transparent",
              border: `1px solid ${
                isActive
                  ? `${colors[index % colors.length]}44`
                  : "rgba(255,255,255,0.08)"
              }`,
              transform: isActive ? "scale(1.05)" : "scale(1)",
              boxShadow: isActive
                ? `0 4px 20px ${colors[index % colors.length]}22`
                : "none",
            }}
            onMouseEnter={() => onHover(index)}
            onMouseLeave={() => onHover(null)}
          >
            <div
              className="w-3 h-3 rounded-full transition-all duration-300"
              style={{
                background: colors[index % colors.length],
                boxShadow: isActive
                  ? `0 0 10px ${colors[index % colors.length]}88`
                  : "none",
              }}
            />
            <span className="text-xs font-medium text-gray-400">
              {entry.name}
            </span>
            <span
              className="text-xs font-bold"
              style={{ color: colors[index % colors.length] }}
            >
              ₹{Number(entry.amount).toLocaleString()}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const CustomPiechart = ({
  data,
  label,
  colors,
  totalAmount,
  showTextAnchor,
}) => {
  const { darkMode } = useContext(ThemeContext);
  const [activeIndex, setActiveIndex] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[380px]">
        <p className="text-gray-400 text-sm">No data available</p>
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={340}>
        <PieChart>
          <defs>
            {colors.map((color, index) => (
              <React.Fragment key={`defs-${index}`}>
                <linearGradient
                  id={`pieGrad-${index}`}
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop offset="0%" stopColor={color} stopOpacity={1} />
                  <stop
                    offset="100%"
                    stopColor={color}
                    stopOpacity={0.65}
                  />
                </linearGradient>
                <filter id={`glow-${index}`}>
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feFlood floodColor={color} floodOpacity="0.4" />
                  <feComposite in2="blur" operator="in" />
                  <feMerge>
                    <feMergeNode />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </React.Fragment>
            ))}
          </defs>

          {/* Background ring */}
          <Pie
            data={[{ value: 1 }]}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={56}
            outerRadius={60}
            fill="none"
            stroke={
              darkMode ? "rgba(139,92,246,0.08)" : "rgba(139,92,246,0.1)"
            }
            strokeWidth={1}
            isAnimationActive={false}
          />

          {/* Outer decorative ring */}
          <Pie
            data={[{ value: 1 }]}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={114}
            outerRadius={117}
            fill="none"
            stroke={
              darkMode ? "rgba(139,92,246,0.08)" : "rgba(139,92,246,0.1)"
            }
            strokeWidth={1}
            isAnimationActive={false}
          />

          {/* Main donut */}
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={68}
            outerRadius={activeIndex !== null ? 112 : 108}
            paddingAngle={4}
            cornerRadius={8}
            labelLine={false}
            animationBegin={0}
            animationDuration={1200}
            animationEasing="ease-out"
            stroke={darkMode ? "#1e1e2f" : "#ffffff"}
            strokeWidth={3}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={`url(#pieGrad-${index})`}
                style={{
                  filter:
                    activeIndex === index
                      ? `url(#glow-${index})`
                      : "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  opacity: activeIndex !== null && activeIndex !== index ? 0.55 : 1,
                }}
              />
            ))}
          </Pie>

          <Tooltip
            content={<CustomTooltipContent colors={colors} />}
            cursor={false}
          />

          {showTextAnchor && (
            <>
              <text
                x="50%"
                y="50%"
                dy={-12}
                textAnchor="middle"
                fill={darkMode ? "#9ca3af" : "#888"}
                fontSize="11px"
                fontWeight="500"
                letterSpacing="1.5px"
                style={{ textTransform: "uppercase" }}
              >
                {label}
              </text>
              <text
                x="50%"
                y="50%"
                dy={16}
                textAnchor="middle"
                fill={darkMode ? "#fff" : "#1f2937"}
                fontSize="20px"
                fontWeight="800"
                letterSpacing="-0.5px"
              >
                {totalAmount}
              </text>
            </>
          )}
        </PieChart>
      </ResponsiveContainer>

      <CustomLegendContent
        data={data}
        colors={colors}
        activeIndex={activeIndex}
        onHover={setActiveIndex}
      />
    </div>
  );
};
