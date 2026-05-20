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
    <div className="card relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div
        className="absolute -top-16 -left-16 w-32 h-32 rounded-full opacity-[0.04] pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
        }}
      />

      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-lg font-bold dark:text-white">Recent Transactions</h5>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
            Latest activity
          </p>
        </div>
        <button
          className="card-btn flex items-center gap-1"
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
