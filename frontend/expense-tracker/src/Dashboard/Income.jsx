import React, { useState } from "react";
import { DashboardLayout } from "../Layout/DashboardLayout";



export default function Income() {

const [openAddIncomeModal,setOpenIncomeModal] = useState(false)

  return (
    <DashboardLayout activeMenu="Income">
      <div className="my-5 mx-auto">
        <div className="grid grid-cols-1 gap-6">
          <div className="">
            <IncomeOverview
              transactions={incomeData}
              onAddIncome={() => setOpenIncomeModal(true)}
            />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
