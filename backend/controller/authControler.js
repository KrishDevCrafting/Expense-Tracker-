const jwt = require("jsonwebtoken");
const User = require("../models/User");
const generateToken = (id) => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

exports.registerUser = async (req, res) => {
  const { fullName, password, email, profileImage } = req.body;

  // Validation check for missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({
      message: "all fields are required",
    });
  }

  try {
    // check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already in use",
      });
    }

    // Create the user
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl: profileImage, // Use correct variable
    });

    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({
      message: "Error registering user",
      error: err.message,
    });
  }
};

exports.loginUser = async (req, res) => {};

exports.getUserInfo = async (req, res) => {


  
};

                                               
