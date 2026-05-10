import React from "react";
import {
  LuUtensils,
  LuTrendingUp,
  LuTrendingDown,
  LuTrash,
  LuAlignHorizontalDistributeEnd,
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
  const getAmountStyles = () =>
    type === "income"
      ? "bg-green-50 dark:bg-green-500/10 text-green-500"
      : "bg-red-50 dark:bg-red-500/10 text-red-500";

  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 dark:hover:bg-white/5">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 dark:text-gray-200 bg-gray-100 dark:bg-white/10 rounded-full">
        {icon ? <img src={icon} alt={title} className="" /> : <LuUtensils />}
      </div>
      <div className="flex-1 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-200 font-medium">{title}</p>
          <p
            className="
          text-xs text-gray-400 dark:text-gray-500 mt-1
          "
          >
            {data}
          </p>
        </div>

        <div className="">
          {!hideDeleteBtn && (
            <button
              className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
              onClick={onDelete}
            >
              <LuTrash2 size={18} />
            </button>
          )}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
          >
            <h6 className="text-xs font-medium">
              {type === "income" ? "+" : "-"}${amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : <LuTrendingDown />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage example
