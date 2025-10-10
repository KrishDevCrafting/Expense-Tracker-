import React from "react";
import { LuArrowRight } from "react-icons/lu";
import { TransactionInfoCard } from "../Card/TransactionInfoCard";
import moment from "moment";

export const ExpenseTransaction = ({ transaction = [], onSeeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense</h5>
        <button
          className="card-btn flex items-center gap-1"
          onClick={onSeeMore}
        >
          See All
          <LuArrowRight className="text-base" />
        </button>
      </div>

      <div className="mt-6">
        {transaction.slice(0, 5).map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            icon={expense.icon}
            data={moment(expense.date).format("Do MMM YYYY")}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))}
      </div>
    </div>
  );
};
