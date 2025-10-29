import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../Layout/DashboardLayout";
import IncomeOverView from "../components/Income/IncomeOverView";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axios";
import Modal from "../components/layout/Modal";
import AddIncomeForm from "../components/Income/AddIncomeForm";
import { toast } from "react-toastify";
import IncomeList from "../components/Income/IncomeList";

export default function Income() {
  const [incomeData, setIncomeData] = useState([]);

  // normalized loading setter
  const [loading, setLoading] = useState(false);

  // fixed spelling and setter name
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    date: null,
  });

  // modal should be closed by default
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get All Income Details (renamed)
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      console.log("API Response Data:", response.data);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  // handle add income (renamed)
  const handleAddIncome = async (income) => {
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

      setOpenAddIncomeModal(false);
      toast.success("Income added succesfully!");
      fetchIncomeDetails();
    } catch (error) {
      console.error(
        "Error adding income!",

        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  // Delete Income (placeholder)
  const deleteIncome = async (id) => {
    // TODO: implement delete API and refresh
    // await axiosInstance.delete(`${API_PATHS.INCOME.DELETE}/${id}`);
    // await fetchIncomeDetails();
  };

  // handle download income details (placeholder)
  const handleDownloadIncome = async () => {
    // TODO: implement export logic
  };

  useEffect(() => {
    fetchIncomeDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverView
              transactions={incomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={incomeData}
            onDelete={(id) => {
              setOpenDeleteAlert({ show: true, data: id });
            }}
            onDownload={handleDownloadIncome}
          />
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
}
