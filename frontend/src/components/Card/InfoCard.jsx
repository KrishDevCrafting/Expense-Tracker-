import React from "react";

const GLOW_MAP = {
  "bg-purple-500": {
    gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)",
    glow: "rgba(139, 92, 246, 0.25)",
    light: "rgba(139, 92, 246, 0.08)",
  },
  "bg-orange-500": {
    gradient: "linear-gradient(135deg, #F97316, #EA580C)",
    glow: "rgba(249, 115, 22, 0.25)",
    light: "rgba(249, 115, 22, 0.08)",
  },
  "bg-red-500": {
    gradient: "linear-gradient(135deg, #F43F5E, #E11D48)",
    glow: "rgba(244, 63, 94, 0.25)",
    light: "rgba(244, 63, 94, 0.08)",
  },
};

export const InfoCard = ({ icon, label, value, color }) => {
  const style = GLOW_MAP[color] || GLOW_MAP["bg-purple-500"];

  return (
    <div
      className="group relative overflow-hidden bg-white dark:bg-[#1e1e2f] p-6 rounded-2xl border border-gray-200/50 dark:border-white/[0.06] transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: `0 1px 3px rgba(0,0,0,0.05)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 8px 30px ${style.glow}, 0 0 0 1px ${style.glow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 1px 3px rgba(0,0,0,0.05)`;
      }}
    >
      {/* Subtle gradient background on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 20% 50%, ${style.light}, transparent 60%)`,
        }}
      />

      <div className="relative flex gap-5 items-center">
        <div
          className="w-14 h-14 flex items-center justify-center text-white text-xl rounded-2xl shadow-lg transition-transform duration-300 group-hover:scale-110"
          style={{
            background: style.gradient,
            boxShadow: `0 4px 15px ${style.glow}`,
          }}
        >
          {icon}
        </div>

        <div>
          <h6 className="text-xs font-medium text-gray-400 dark:text-gray-500 mb-1 tracking-wide uppercase">
            {label}
          </h6>
          <span className="text-2xl font-bold text-gray-800 dark:text-white tracking-tight">
            ${value}
          </span>
        </div>
      </div>
    </div>
  );
};
