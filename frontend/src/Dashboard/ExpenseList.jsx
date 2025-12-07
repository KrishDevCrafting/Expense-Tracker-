import moment from "moment";
import React from "react";
import { LuDownload } from "react-icons/lu";
import { TransactionInfoCard } from "../components/Card/TransactionInfoCard";

const ExpenseList = ({ transactions = [], onDelete = () => {}, onDownload = () => {} }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200/50">
      <div className="flex items-center justify-between mb-6">
        <h5 className="text-lg font-semibold">Expense List</h5>

        <button
          type="button"
          onClick={onDownload}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
          aria-label="Download expenses"
        >
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-400 col-span-full">No expenses found.</p>
        ) : (
          transactions.map((expense) => (
            <TransactionInfoCard
              key={expense._id}
              title={expense.category}
              icon={expense.icon}
              data={moment(expense.date).format("DD MMM, YYYY")}
              amount={expense.amount}
              type="expense"
              onDelete={() => onDelete(expense._id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
