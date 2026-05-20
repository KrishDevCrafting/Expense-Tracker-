import React from "react";
import { LuDownload } from "react-icons/lu";
import { TransactionInfoCard } from "../Card/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  return (
    <>
      <div className="bg-white dark:bg-[#1e1e2f] p-4 rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-white/10">
        <div className="flex items-center justify-between">
          <h5 className="text-lg dark:text-white">Income Source</h5>
          <button
            className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            onClick={onDownload}
          >
            <LuDownload className="text-base" />
            Download
          </button>
        </div>

        <div className="mt-4">
          {transactions.length === 0 ? (
            <p className="text-sm text-gray-400 dark:text-gray-500">No income records.</p>
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
