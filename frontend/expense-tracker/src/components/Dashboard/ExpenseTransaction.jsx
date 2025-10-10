import React from "react";
import { LuArrowRight } from "react-icons/lu";

export const ExpenseTransaction = ({ transaction, OnseeMore }) => {
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Expense</h5>
        <button
          className="card-btn flex items-center gap-1"
          onClick={OnseeMore}
        >
          See All
          <LuArrowRight className="text-base" />
        </button>
      </div>
    </div>
  );
};
