import moment from "moment";
import React from "react";
import { LuDownload } from "react-icons/lu";
import { TransactionInfoCard } from "../components/Card/TransactionInfoCard";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex item-center justify-between">
        <h5 className="card-btn" onClick={onDownload}></h5>

        <button type="button" onClick={onDownload}>
          <LuDownload className="text-base" /> Download
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2">
        {transactions?.map((expense) => {
          <TransactionInfoCard
            key={expense._id}
            title={expense.catogory}
            icon={expense.icon}
            date={moment(expense.date).format("DD MMM, YYYY")}
            ampount={expense.amount}
            type="expense"
            onDelete={() => onDelete(expense._id)}
          />;
        })}
      </div>
    </div>
  );
};

export default ExpenseList;
