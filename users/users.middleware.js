const jwt = require("jsonwebtoken");
const User = require("./users.model");

//finds existing user and grants the user access
const AuthorizeUser = async (req, res, next) => {
  const bearerToken = req.headers["authorization"];

  if (!bearerToken) {
    return res.status(401).json({
      message: "Authorization failed",
    });
  }

  const tokenArray = bearerToken.split(" ");

  const token = tokenArray[1];

  if (!token) {
    return res.status(401).json({
      message: "Authorization failed",
    });
  }

  try {
    const decoded = await jwt.verify(
      token,
      process.env.JWT_SECRET || "test_secret"
    );
    const user = await User.findById(decoded.id);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Authorization failed",
    });
  }
};

module.exports = {
  AuthorizeUser,
};
