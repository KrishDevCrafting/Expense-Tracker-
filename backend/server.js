const express = require("express");

require("dotenv").config();
const cors = require("cors");
const path = require("path");

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
