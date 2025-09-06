const express = require('express');

const {potect} = require("../middleware/authMiddleware");
const {getDashboardData} = require("../controller/dashboardController");
const router = express.Router();









router.get("/",potect,getDashboardData);


modules.exports = router;