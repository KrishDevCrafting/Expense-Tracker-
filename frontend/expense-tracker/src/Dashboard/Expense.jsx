import React, { useState } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { toast } from "react-toastify";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axios";
export default function Expense() {
  useUserAuth();

  const [ExpenseData, setExpenseData] = useState([]);

  // normalized loading setter
  const [loading, setLoading] = useState(false);

  // use `data` consistently for the selected id
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // modal should be closed by default
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get All Income Details (renamed)
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      // optional: check shape of response
      if (response?.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
      toast.error("Failed to fetch income details");
    } finally {
      setLoading(false);
    }
  };

  // handle add expense (renamed)
  const handleAddExpense = async (income) => {
    const { source, amount, date, icon } = income;

    // Validation Checks
    if (!source || !String(source).trim()) {
      toast.error("Source is required");
      return;
    }

    const numAmount = Number(amount);
    if (!amount || isNaN(numAmount) || numAmount <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }
    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount: numAmount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Income added successfully!");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income!", error);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto"></div>
    </DashboardLayout>
  );
}
