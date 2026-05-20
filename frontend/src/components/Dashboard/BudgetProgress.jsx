import React, { useEffect, useState } from "react";

const BudgetProgress = ({ totalIncome, totalExpense }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  const spendingRatio =
    totalIncome > 0
      ? Math.min((totalExpense / totalIncome) * 100, 100)
      : 0;

  const remaining = totalIncome - totalExpense;
  const isOverBudget = remaining < 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidth(spendingRatio);
    }, 300);
    return () => clearTimeout(timer);
  }, [spendingRatio]);

  const getBarColor = () => {
    if (spendingRatio > 90) return { main: "#F43F5E", glow: "rgba(244,63,94,0.3)" };
    if (spendingRatio > 70) return { main: "#F97316", glow: "rgba(249,115,22,0.3)" };
    if (spendingRatio > 50) return { main: "#EAB308", glow: "rgba(234,179,8,0.3)" };
    return { main: "#22C55E", glow: "rgba(34,197,94,0.3)" };
  };

  const colors = getBarColor();

  const getStatusText = () => {
    if (isOverBudget) return "⚠️ Overspent!";
    if (spendingRatio > 90) return "🔴 Critical — almost out of budget";
    if (spendingRatio > 70) return "🟠 Caution — spending is high";
    if (spendingRatio > 50) return "🟡 Moderate — halfway through";
    return "🟢 Healthy — well within budget";
  };

  return (
    <div className="card relative overflow-hidden col-span-1 md:col-span-2">
      {/* Decorative */}
      <div
        className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${colors.main}, transparent 70%)`,
        }}
      />

      <div className="flex items-center justify-between mb-4">
        <div>
          <h5 className="text-lg font-bold dark:text-white">
            Spending Meter
          </h5>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Expense vs Income ratio
          </p>
        </div>
        <div
          className="px-3 py-1.5 rounded-full text-xs font-semibold border"
          style={{
            color: colors.main,
            background: `${colors.main}12`,
            borderColor: `${colors.main}25`,
          }}
        >
          {Math.round(spendingRatio)}% used
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative">
        <div
          className="w-full h-4 rounded-full overflow-hidden"
          style={{
            background: "rgba(139,92,246,0.06)",
          }}
        >
          <div
            className="h-full rounded-full relative"
            style={{
              width: `${animatedWidth}%`,
              background: `linear-gradient(90deg, ${colors.main}cc, ${colors.main})`,
              boxShadow: `0 0 20px ${colors.glow}`,
              transition: "width 1.2s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* Shimmer effect */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                animation: "shimmer 2s infinite",
              }}
            />
          </div>
        </div>

        {/* Labels below bar */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <p className="text-xs text-gray-400 dark:text-gray-500">Spent</p>
            <p className="text-sm font-bold dark:text-white" style={{ color: colors.main }}>
              ₹{Number(totalExpense).toLocaleString()}
            </p>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            {getStatusText()}
          </p>
          <div className="text-right">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {isOverBudget ? "Over by" : "Remaining"}
            </p>
            <p
              className="text-sm font-bold"
              style={{ color: isOverBudget ? "#F43F5E" : "#22C55E" }}
            >
              ₹{Math.abs(remaining).toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default BudgetProgress;
