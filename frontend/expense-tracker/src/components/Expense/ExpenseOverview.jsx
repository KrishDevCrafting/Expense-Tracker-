import React, { useState, useEffect } from "react";
import { LuPlug } from "react-icons/lu";
import { prepareExpenseBarChartData } from "../../utils/helper";
const ExpenseOverview = ({ transactions, onExpenseIncome }) => {
  const [charData, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transactions);
    setChartData(result);

    return () => {};
  }, [transactions]);

  return (
    <>
      <div className="">
        <div
        className=""
        >
          <div
          className=""
          >
            <h5>Expense Overview</h5>
            <p className="">
              Track your spending trends over time and gain insights your money
              goes.
            </p>
          </div>
          <button className="" onClick={onExpenseIncome}>
            <LuPlug className="" />
            Add Expense
          </button>
        </div>
      </div>
    </>
  );
};

export default ExpenseOverview;
