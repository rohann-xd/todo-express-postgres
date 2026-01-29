const { AppError } = require("./errorHandler");
const catchAsync = require("./catchAsync");
const { decryptAndVerifyJWT } = require("../utils/jwt.utils");
const userRepository = require("../repositories/user.repository");
const { NODE_ENV } = require("../config/config");

// ===============================
// Protect middleware
// ===============================
const protect = catchAsync(async (req, res, next) => {
  let token;

  // Production → httpOnly cookie only
  if (NODE_ENV === "production") {
    token = req.cookies?.accessToken;
  } else {
    // Dev → cookie OR Authorization header
    token = req.cookies?.accessToken;

    if (!token && req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }
  }

  if (!token) {
    throw new AppError(
      "You are not logged in. Please log in to access this resource.",
      401,
    );
  }

  // 1. Decrypt & verify JWT
  let payload;
  try {
    payload = await decryptAndVerifyJWT(token);
  } catch (err) {
    throw new AppError(
      "Invalid token or session expired. Please log in again.",
      401,
    );
  }

  // 2. Ensure access token
  if (payload.type !== "access") {
    throw new AppError("Invalid token type. Access token required.", 401);
  }

  // 3. Check user still exists
  const user = await userRepository.findUserById(payload.id);

  if (!user) {
    throw new AppError(
      "The user belonging to this token no longer exists.",
      401,
    );
  }

  // 4. Attach user to request
  req.user = user;
  next();
});

module.exports = {
  protect,
  authMiddleware: protect,
};
