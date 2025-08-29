const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const app = express();
const incomeRoutes = require("./routes/incomeRoutes");
// Middleware

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
connectDB();

app.get("/", (req, res) => {
  const PORT = process.env.PORT || 7000;
  res.send(`<h1>
        Yayyy sever is running!
        ${PORT}
        </h1>`);
});

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
