import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../Layout/DashboardLayout";
import IncomeOverView from "../components/Income/IncomeOverView";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axios";
import Modal from "../components/layout/Modal";
import AddIncomeForm from "../components/Income/AddIncomeForm";
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
  const handleAddIncome = async (payload) => {
  
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
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onClose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <div className="text-white">Add Income Form</div>
          <AddIncomeForm onAddIncome={handleAddIncome} />
        </Modal>
      </div>
    </DashboardLayout>
  );
}
