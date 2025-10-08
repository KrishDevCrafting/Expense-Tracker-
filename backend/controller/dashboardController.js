const Income = require("../models/income");
const Expense = require("../models/Expense");
const { isValidObjectId, Types } = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    const userId = req.user.id;
    const userObjectId = new Types.ObjectId(String(userId));

    // Total Income
    const totalIncome = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    console.log("totalIncome", { totalIncome, userId: isValidObjectId });
    // Total Expense
    const totalExpense = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // Last 60 days income transactions
    const last60daysIncomeTransaction = await Income.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });

    // Total income for last 60 days
    const last60daysIncome = last60daysIncomeTransaction.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    );

    // Last 30 days expense and income transactions
    const last30daysExpenseTransaction = await Expense.find({
      userId,
      date: {
        $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    }).sort({ date: -1 });
    // Get total expense for last 30 days!
    const expenseLast30days = last30daysExpenseTransaction.reduce(
      (sum, txn) => sum + txn.amount,
      0
    );

    // Last 5 transactions (income + expense)
    const lastTransactions = [
      ...(await Income.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "Income",
        })
      ),
      ...(await Expense.find({ userId }).sort({ date: -1 }).limit(5)).map(
        (txn) => ({
          ...txn.toObject(),
          type: "Expense",
        })
      ),
    ].sort((a, b) => b.date - a.date);

    // Final Response
    res.json({
      totalBalance:
        (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
      totalIncome: totalIncome[0]?.total || 0,
      totalExpense: totalExpense[0]?.total || 0,
      last30daysExpense: {
        total: expenseLast30days,
        transaction: last30daysExpenseTransaction,
      },
      last60daysIncome: {
        total: last60daysIncome,
        transaction: last60daysIncomeTransaction,
      },
      recentTransactions: lastTransactions,
    });
  } catch (error) {
    res.status(500).json({
      message: "server Error",
      error,
    });
  }
};
