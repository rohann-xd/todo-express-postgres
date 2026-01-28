const { registerUser } = require("../services/auth.service");
const sendResponse = require("../utils/responseHandler");
const catchAsync = require("../middlewares/catchAsync");

const register = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body || {};

  const user = await registerUser({
    name,
    email,
    password,
  });

  return sendResponse(res, 201, true, "User registered successfully", {
    user,
  });
});

module.exports = {
  register,
};
