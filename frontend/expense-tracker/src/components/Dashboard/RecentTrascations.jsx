import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import "../../../src/index.css";
 // Make sure this import is correct

export const RecentTransactions = ({ transaction = [], onSeeMore }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-gray-100 border-gray-200/50">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Recent Transactions</h5>
        <button
          className="flex items-center gap-3 text-[12px] font-medium text-gray-700 hover:text-purple-500 bg-gray-50 hover:bg-purple-50 px-4 py-1.5 rounded-lg border border-gray-200/50 cursor-pointer"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {transaction?.slice(0, 5).map((item) => (
          <TransactionInfoCard
            key={item._id}
            title={item.type === "expense" ? item.category : item.source}
            icon={item.icon}
            data={moment(item.date).format("Do MM YYYY")}
            amount={item.amount}
            type={item.type}
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};
