const express = require("express");

const {
  addExpense,
  getAllExpense,
  deleteExpense,
  downloadExpense,
} = require("../controller/expenseController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add", protect, addExpense);

router.get("/get", protect, getAllExpense);
router.get("/download", protect, deleteExpense);

router.delete("/:id", protect, downloadExpense);

module.exports = router;