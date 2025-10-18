import React, { useState } from "react";
import { DashboardLayout } from "../Layout/DashboardLayout";
import IncomeOverView from "../components/Income/IncomeOverView";
export default function Income() {
  const [incomeData, setIncomeData] = useState([]);

  const [loading, setloading] = useState(false);
  const [openDelelteAlert, setopenDeleteAlert] = useState({
    show: false,
    date: null,
  });
  const [openAddIncomeModal, setOpenIncomeModal] = useState(false);

  // Get All Income Details
  const fetchincomeDetalis = async () => {
    if (loading) return;
    setloading(true);

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.INCOME.GET_ALL_INCOME}`
      );

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
      </div>
    </DashboardLayout>
  );
}
