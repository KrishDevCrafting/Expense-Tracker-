import React, { useState } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import { DashboardLayout } from "../Layout/DashboardLayout";

export default function Expense() {
  useUserAuth();

  const [ExpenseData, setExpenseData] = useState([]);

  // normalized loading setter
  const [loading, setLoading] = useState(false);

  // use `data` consistently for the selected id
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });

  // modal should be closed by default
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto"></div>
    </DashboardLayout>
  );
}
