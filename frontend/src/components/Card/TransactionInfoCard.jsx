import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash2,
} from "react-icons/lu";

export const TransactionInfoCard = ({
  title,
  icon,
  data,
  amount,
  type,
  hideDeleteBtn,
  onDelete,
}) => {
  const isIncome = type === "income";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-xl hover:bg-gray-50/80 dark:hover:bg-white/[0.03] transition-all duration-200">
      <div
        className="w-11 h-11 flex items-center justify-center text-lg rounded-xl transition-transform duration-200 group-hover:scale-105"
        style={{
          background: isIncome
            ? "rgba(34,197,94,0.08)"
            : "rgba(244,63,94,0.08)",
        }}
      >
        {icon ? (
          <img src={icon} alt={title} className="w-6 h-6" />
        ) : (
          <LuUtensils
            className={isIncome ? "text-green-500" : "text-rose-500"}
          />
        )}
      </div>

      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            {title}
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            {data}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-500/10"
              onClick={onDelete}
            >
              <LuTrash2 size={16} />
            </button>
          )}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
            style={{
              background: isIncome
                ? "rgba(34,197,94,0.08)"
                : "rgba(244,63,94,0.08)",
              color: isIncome ? "#22c55e" : "#f43f5e",
            }}
          >
            <span>
              {isIncome ? "+" : "-"}${Number(amount).toLocaleString()}
            </span>
            {isIncome ? (
              <LuTrendingUp size={14} />
            ) : (
              <LuTrendingDown size={14} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage example
