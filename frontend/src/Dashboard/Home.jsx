import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import { ExpenseTransaction } from "../components/Dashboard/ExpenseTransaction";
import { Last30DaysExpense } from "../components/Dashboard/Last30DaysExpense";
import RecentIncomeWithChart from "../components/Dashboard/RecentIncomeWithChart";
import RecentIncome from "../components/Dashboard/RecentIncome";
import WelcomeBanner from "../components/Dashboard/WelcomeBanner";
import BudgetProgress from "../components/Dashboard/BudgetProgress";

export default function Home() {
  useUserAuth();
  const navigate = useNavigate();

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
        {loading ? (
          <div className="py-10 text-center">Loading...</div>
        ) : (
          <>
            {/* Welcome Banner */}
            <WelcomeBanner
              totalBalance={dashboardData?.totalBalance || 0}
              totalIncome={dashboardData?.totalIncome || 0}
              totalExpense={dashboardData?.totalExpense || 0}
            />

            {/* Info Cards */}
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

            {/* Spending Meter — full width */}
            <div className="mt-6">
              <BudgetProgress
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpense || 0}
              />
            </div>

            {/* Charts & Transactions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <RecentTransactions
                transaction={dashboardData?.recentTransactions || []}
                onSeeMore={() => navigate("/expense")}
              />
              <FinanceOverview
                totalBalance={dashboardData?.totalBalance || 0}
                totalIncome={dashboardData?.totalIncome || 0}
                totalExpense={dashboardData?.totalExpense || 0}
              />
              <ExpenseTransaction
                transaction={
                  dashboardData?.last30daysExpense?.transaction || []
                }
                onSeeMore={() => navigate("/expense")}
              />

              <Last30DaysExpense
                data={dashboardData?.last30daysExpense?.transaction || []}
              />

              <RecentIncomeWithChart
                data={
                  dashboardData?.last60daysIncome?.transaction?.slice(0, 4) ||
                  []
                }
                totalIncome={dashboardData?.totalIncome || 0}
              />

              <RecentIncome
                transaction={
                  dashboardData?.last60daysIncome?.transaction || []
                }
                onSeeMore={() => navigate("/income")}
              />
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
