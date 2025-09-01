// Add Income Source User
const User = require("../models/User");
const Income = require("../models/income");
const xlsx = require("xlsx");
exports.addIncome = async (req, res) => {
  const userId = req.user._id;
  try {
    const { icon, source, amount, date } = req.body;
    // Validation: check for missing fields
    if (!source || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = new Income({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    await newIncome.save();
    res.status(200).json(newIncome);
  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
};
// getAllIncome
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({
      userId,
    }).sort({
      date: -1,
    });

    res.json(income);
  } catch (error) {
    res.status(500).json({
      message: "server Error",
    });
  }
};
// deleteIncome
exports.deleteIncome = async (req, res) => {
  // const userId = req.user.id;

  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({
      message: "Income delete succesful",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// downloadIncomeExcel
exports.downloadIncomeExcel = async (req, res) => {
  const userId = res.req.id;
  try {
    const income = await Income.find({
      userId,
    }).sort({
      date: -1,
    });
    const data = income.map((item) => ({
      Source: item.source,
      Amount: item.amount,
      Date: item.date,
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Income");
    xlsx.writeFile(wb, "income_detalis.xlsx");
    res.download("income_details.xlsx");
  } catch (error) {
    res.status(500).json({
      message: "server Error!",
    });
  }
};
