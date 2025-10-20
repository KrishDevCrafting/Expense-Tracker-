import React, { useEffect, useState } from "react";
import { LuPlus } from "react-icons/lu";
import CustomBarChart from "../Chats/CustomBarChart";
import { prepareExpenseBarChartData } from "../../utils/helper";
const IncomeOverView = ({ transaction, onAddIncome }) => {
  const [chartdata, setChartData] = useState([]);

  useEffect(() => {
    const result = prepareExpenseBarChartData(transaction);
    setChartData(result);

    return () => {};
  }, [transaction]);

  return <div></div>;
};

export default IncomeOverView;
