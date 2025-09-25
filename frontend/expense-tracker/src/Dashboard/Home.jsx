import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { useUserAuth } from "../hooks/useUserAuth";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPaths";
import { InfoCard } from "../components/layout/Card/InfoCard";
import {LuHandCoins,LuwalletMinialmal} from "react-icons/lu"
import {IoMdCard} from "react-icons/io"

export default function Home() {
  useUserAuth();

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchDashboard = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const response = await axiosInstance.get(API_PATHS.DASHBOARD.GET_DATA);
      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong. Please try again!", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <h1 className="text-xl font-bold">Welcome to Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<IoMDCard />}
            label="Total Balance"
            value={addThousandSeparator(dashboardData?.totalBalance || 0)}
            color="bg-primary"
          />
        </div>
      </div>
    </DashboardLayout>
  );
}
