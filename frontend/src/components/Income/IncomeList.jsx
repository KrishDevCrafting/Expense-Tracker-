import React from "react";
import { LuDownload } from "react-icons/lu";
import { TransactionInfoCard } from "../Card/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  return (
    <>
      <div>IncomeList</div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <h5 className="text-lg">Income Source</h5>
          <button
            className="flex items-center gap-2 text-sm text-gray-700"
            onClick={onDownload}
          >
            <LuDownload className="text-base" />
            Download
          </button>
        </div>

        <div className="mt-4">
          {transactions.length === 0 ? (
            <p className="text-sm text-gray-400">No income records.</p>
          ) : (
            transactions.map((income) => (
              <TransactionInfoCard
                key={income._id}
                title={income.source}
                icon={income.icon}
                data={moment(income.date).format("Do MMM YYYY")}
                amount={Number(income.amount) || 0}
                type="income"
                onDelete={() => onDelete(income._id)}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default IncomeList;
