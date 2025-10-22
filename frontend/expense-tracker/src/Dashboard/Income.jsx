import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../Layout/DashboardLayout";
import IncomeOverView from "../components/Income/IncomeOverView";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axios";
import Modal from "../components/layout/Modal";
export default function Income() {
  const [incomeData, setIncomeData] = useState([]);

  const [loading, setloading] = useState(false);
  const [openDelelteAlert, setopenDeleteAlert] = useState({
    show: false,
    date: null,
  });
  const [openAddIncomeModal, setOpenIncomeModal] = useState(true);

  // Get All Income Details
  const fetchincomeDetalis = async () => {
    if (loading) return;
    setloading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );
      console.log("API Response Data:", response.data);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Somthing went worng. Please try again.", error);
    } finally {
      setloading(false);
    }
  };
  // handle and income
  const handleAddincome = async () => {};
  // Delete Income

  const deleteIncome = async (id) => {};
  // handle downlaod income details

  const handleDownloadIncome = async () => {};
  useEffect(() => {
    fetchincomeDetalis();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverView
              transactions={incomeData}
              onAddIncome={() => setOpenIncomeModal(true)}
            />
          </div>
        </div>

        <Modal
          isOpen={openAddIncomeModal}
          onclose={() => setOpenAddIncomeModal(false)}
          title="Add Income"
        >
          <div>Add Income Form</div>
        </Modal>
      </div>
    </DashboardLayout>
  );
}

// no code
