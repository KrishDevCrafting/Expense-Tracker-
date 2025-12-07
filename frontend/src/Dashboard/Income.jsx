import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../Layout/DashboardLayout";
import IncomeOverView from "../components/Income/IncomeOverView";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axios";
import Modal from "../components/layout/Modal";
import AddIncomeForm from "../components/Income/AddIncomeForm";
import { toast } from "react-toastify";
import IncomeList from "../components/Income/IncomeList";
import DeleteAlert from "../components/DeleteAlert";

export default function Income() {
  const [incomeData, setIncomeData] = useState([]);

  // normalized loading setter
  const [loading, setLoading] = useState(false);

  // use `data` consistently for the selected id
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // modal should be closed by default
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get All Income Details (renamed)
  const fetchIncomeDetails = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      // optional: check shape of response
      if (response?.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again.", error);
      toast.error("Failed to fetch income details");
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
      toast.success("Income added successfully!");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error adding income!", error);
      toast.error(error.response?.data?.message || "Failed to add income");
    }
  };

  // Delete Income
  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Income deleted successfully!");
      fetchIncomeDetails();
    } catch (error) {
      console.error("Error deleting income!", error);
      toast.error(error.response?.data?.message || "Failed to delete income");
    }
  };

  // handle download income details (placeholder)
  const handleDownloadIncome = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME,
        {
          responseType: "blob",
        }
      );

      // Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income_details.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading income details:", error);
      toast.error("Failed to download income details. Please try again.");
    }
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

        <Modal
          isOpen={openDeleteAlert.show}
          title="Delete Income"
          onClose={() => {
            setOpenDeleteAlert({
              show: false,
              data: null,
            });
          }}
        >
          <DeleteAlert
            content="Are you sure you want to delete this income?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
            onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
          />
        </Modal>
      </div>
    </DashboardLayout>
  );
}
