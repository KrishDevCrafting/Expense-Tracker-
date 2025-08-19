const jwt = require("jsonwebtoken");
const USer = require("../models/User");

exports.protect = async (req, res, next) => {
  let token = req.headers.authorization?.slipt(" ")[1];
  if (!token)
    return res.status(401).json({
      message: "Not authorized, no token",
    });
};
