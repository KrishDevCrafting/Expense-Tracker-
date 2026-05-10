import React from "react";
import { LuArrowRight } from "react-icons/lu";
import moment from "moment";
import "../../../src/index.css";
import { TransactionInfoCard } from "../Card/TransactionInfoCard";

export const RecentTransactions = ({ transactions = [], transaction = [], onSeeMore }) => {
  // Support both prop names: `transactions` (plural) and `transaction` (singular)
  const tx = (Array.isArray(transactions) && transactions.length > 0)
    ? transactions
    : (Array.isArray(transaction) ? transaction : []);

  return (
    <div className="bg-white dark:bg-[#1e1e2f] p-6 rounded-2xl shadow-gray-100 dark:shadow-none border border-gray-200/50 dark:border-white/10">
      <div className="flex items-center justify-between">
        <h5 className="text-lg dark:text-white">Recent Transactions</h5>
        <button
          className="flex items-center gap-3 text-[12px] font-medium text-gray-700 dark:text-gray-300 hover:text-purple-500 bg-gray-50 dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-500/10 px-4 py-1.5 rounded-lg border border-gray-200/50 dark:border-white/10 cursor-pointer"
          onClick={onSeeMore}
        >
          See All <LuArrowRight className="text-base" />
        </button>
      </div>
      <div className="mt-6">
        {tx.length === 0 ? (
          <p className="text-gray-400 dark:text-gray-500 text-sm">No recent transactions.</p>
        ) : (
          tx.slice(0, 5).map((item) => (
            <TransactionInfoCard
              key={item._id}
              title={item.type === "expense" ? item.category : item.source}
              icon={item.icon}
              data={moment(item.date).format("DD MMM YYYY")}
              amount={item.amount}
              type={item.type}
              hideDeleteBtn
            />
          ))
        )}
      </div>
    </div>
  );
};
