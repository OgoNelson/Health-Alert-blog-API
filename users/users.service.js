const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("./users.model");

//Generates token for each user action
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "test_secret", {
    expiresIn: "1h",
  });
};

//create user
const CreateUser = async ({ first_name, last_name, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return { status: 409, success: false, message: "User already exists" };
  }

  const user = await User.create({ first_name, last_name, email, password });

  const token = generateToken(user._id);

  return { status: 201, success: true, data: { user, token } };
};

//Login for existing users
const LoginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    return { status: 400, success: false, message: "Invalid credentials" };
  }

  // Compare password
  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return { status: 400, success: false, message: "Invalid credentials" };
  }

  const token = generateToken(user._id);

  return { status: 200, success: true, data: { user, token } };
};

module.exports = {
  CreateUser,
  LoginUser,
};
