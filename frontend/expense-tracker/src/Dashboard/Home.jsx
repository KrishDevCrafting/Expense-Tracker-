import React from "react";
import { DashboardLayout } from "../Layout/DashboardLayout";
useUserAuth()
export default function Home() {
  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="my-5 mx-auto">
        <h1 className="text-xl font-bold">Welcome to Dashboard</h1>
      </div>
    </DashboardLayout>
  );
}
