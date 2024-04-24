const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


// Signup Controller for Registering Users
exports.signup = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password.length < 5) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 5 characters long.",
      });
    }

    // Check if user already exists
    const existingByEmail = await User.findOne({ email });
    const existingByMobile = await User.findOne({ mobile });

    if (existingByEmail || existingByMobile) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    // Generate JWT token
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id.toString(),
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    return res.status(200).json({
      success: true,
      user,
      token,
      message: "User registered successfully and logged in",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};


// Login controller for authenticating users
exports.login = async (req, res) => {
  try {
    // Get email or number and password from request body
    const { emailOrNumber, password } = req.body;

    // Check if emailOrNumber or password is missing
    if (!emailOrNumber || !password) {
      // Return 400 Bad Request status code with error message
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }

    // Find user with provided email or number
    const user = await User.findOne({
      $or: [{ email: emailOrNumber }, { mobile: emailOrNumber }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us. Please SignUp to Continue`,
      });
    }

    // Compare Password
    if (await bcrypt.compare(password, user.password)) {
      const token = jwt.sign(
        {
          email: user.email,
          id: user._id.toString(),
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      return res.status(200).json({
        success: true,
        token,
        name: user.name,
        mobile: user.mobile,
        message: `User Login Success`,
      });
    } else {
      // Return 401 Unauthorized status code with error message
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (error) {
    console.error(error);
    // Return 500 Internal Server Error status code with error message
    return res.status(500).json({
      success: false,
      message: `Login Failure. Please Try Again`,
    });
  }
};
