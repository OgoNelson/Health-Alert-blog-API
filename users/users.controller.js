const UserService = require("./users.service");

//controller for create user
const createUserController = async (req, res) => {
  try {
    const payload = req.body;

    const response = await UserService.CreateUser(payload);

    if (response) {
      res.status(response.status).json(response);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

//controller for login user
const loginUserController = async (req, res) => {
  try {
    const payload = req.body;
    const response = await UserService.LoginUser(payload);

    if (response) {
      res.status(response.status).json(response);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  createUserController,
  loginUserController,
};
