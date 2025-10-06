import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import { DashboardLayout } from "../Layout/DashboardLayout";
import { useUserAuth } from "../hooks/useUserAuth";
import axiosInstance from "../utils/axios";
import { API_PATHS } from "../utils/apiPaths";
import { InfoCard } from "../components/Card/InfoCard";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import { IoMdCard } from "react-icons/io";
import { addThousandSeparator } from "../utils/helper";
import { RecentTransactions } from "../components/Dashboard/RecentTrascations";
import { FinanceOverview } from "../components/Dashboard/FinanceOverview";

export default function Home() {
  useUserAuth();
  const navigate = useNavigate(); // 2. Initialize navigate

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

        {loading ? (
          <div className="py-10 text-center">Loading...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InfoCard
                icon={<IoMdCard />}
                label="Total Balance"
                value={addThousandSeparator(dashboardData?.totalBalance || 0)}
                color="bg-purple-500"
              />
              <InfoCard
                icon={<LuHandCoins />}
                label="Total Income"
                value={addThousandSeparator(dashboardData?.totalIncome || 0)}
                color="bg-orange-500"
              />
              <InfoCard
                icon={<LuWalletMinimal />}
                label="Total Expense"
                value={addThousandSeparator(dashboardData?.totalExpense || 0)}
                color="bg-red-500"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {/* 3. Corrected Component and props */}
              <RecentTransactions
                transactions={dashboardData?.recentTransactions}
                onSeeMore={() => navigate("/expense")}
              />
              <FinanceOverview />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
