import React, { useEffect, useState } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { toast } from "react-toastify";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axios";
import ExpenseOverview from "../components/Expense/ExpenseOverview";
import AddExpenseForm from "../components/Expense/AddExpenseForm";
import Modal from "../components/layout/Modal";
import DeleteAlert from "../components/DeleteAlert";
import ExpenseList from "./ExpenseList";
export default function Expense() {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);

  // normalized loading setter
  const [loading, setLoading] = useState(false);

  // use `data` consistently for the selected id
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // modal should be closed by default
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  // Get All expense Details (renamed)
  const fetchExpenseDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );
      // optional: check shape of response
      if (response?.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
      toast.error("Failed to fetch expense details");
    } finally {
      setLoading(false);
    }
  };

  // Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("expense deleted successfully!");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense!", error);
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const handleDeleteExpenseDownload = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
        {
          responseType: "blob",
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading Expense details:", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  // handle add expense (renamed)
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Validation Checks
    if (!category || !String(category).trim()) {
      toast.error("category is required");
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
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount: numAmount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully!");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error adding expense!", error);
      toast.error(error.response?.data?.message || "Failed to add expense");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-1">
          <div className="">
            <ExpenseOverview
              transactions={expenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>
        </div>
        <ExpenseList
          transactions={expenseData || []}
          onDelete={(id) => {
            setOpenDeleteAlert({
              show: true,
              data: id,
            });
          }}
          onDownload={handleDeleteExpenseDownload}
        />
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Expense"
        >
          <DeleteAlert
            content="Are you sure you want to delete this expense?"
            onDelete={() => deleteExpense(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}
