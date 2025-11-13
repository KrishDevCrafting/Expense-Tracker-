import React from "react";

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
  return (
    <div className="card">
      <div className="flex item-center justify-between">
        <h5 className="card-btn" onClick={onDownload}></h5>
      </div>
    </div>
  );
};

export default ExpenseList;
