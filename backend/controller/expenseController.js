// Add expense Source User
const User = require("../models/User");
const Expense = require("../models/Expense");
const xlsx = require("xlsx");

exports.addExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const { icon, category, amount, date } = req.body;
    // Validation: check for missing fields
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });

    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
// getAllExpense
exports.getAllExpense = async (req, res) => {
  const userId = req.user._id;
  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "server Error" });
  }
};
// deleteExpense
exports.deleteExpense = async (req, res) => {
  // const userId = req.user.id;

  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({
      message: "Expense delete succesful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// downloadExpenseExcel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user._id;
  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    const data = expense.map((item) => ({
      category: item.category,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "expense");
    const filePath = __dirname + "/../expense_details.xlsx";
    xlsx.writeFile(wb, filePath);
    res.download(filePath);
  } catch (error) {
    res.status(500).json({ message: "server Error!" });
  }
};
