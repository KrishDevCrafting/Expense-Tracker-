import React, { useState, useEffect } from "react";
import { DashboardLayout } from "../Layout/DashboardLayout";
import { useUserAuth } from "../hooks/useUserAuth";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPaths";

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
    // eslint-disable-next-line
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <h1 className="text-xl font-bold">Welcome to Dashboard</h1>
        {/* You can render dashboardData here */}
      </div>
    </DashboardLayout>
  );
}
