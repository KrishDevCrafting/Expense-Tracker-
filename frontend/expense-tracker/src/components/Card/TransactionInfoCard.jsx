import react from "react";
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
}) => {
  return (
    <div className="group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60">
      <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full">
        {icon ? <img src={icon} alt={title} className="" /> : <LuUtensils />}
      </div>
      <div className="flex-1 flex item-center justify-between">
        <div>
          <p className="text-sm text-gray-700 font-medium">{title}</p>
          <p
            className="
          text-xs text-gray-400 mt-1
          "
          >
            {data}
          </p>
        </div>

        <div className="">
          {!hideDeleteBtn && (
            <button className="" onClick={onDate}>
              <LuTrash2 size={18} />
            </button>
          )}
          <div className={`flex item-center gap-2 px-3 py-1.5 rounded-md`}>
            <h6 className="">
              {type === "income" ? "+" : "-"}${amount}
            </h6>
            {type === "income" ? <LuTrendingUp /> : LuTrendingDown}
          </div>
        </div>
      </div>
    </div>
  );
};

// Usage example
