import React from "react";
import { LuDownload } from "react-icons/lu";

const IncomeList = ({ trasactions, onDelete, onDownload }) => {
  return (
    <>
      <div>IncomeList</div>

      <div className="card">
        <div className="flex item-center justify-between">
          <h5 className="text-lg">Income Source</h5>
          <button className="" onclick={onDownload}>
            <LuDownload className="text-base" />
            Download
          </button>
        </div>
      </div>
    </>
  );
};

export default IncomeLis;
// jshdfg