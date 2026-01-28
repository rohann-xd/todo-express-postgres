const userRepository = require("../repositories/user.repository");
const { AppError } = require("../middlewares/errorHandler");

const registerUser = async ({ name, email, password }) => {
  // 1. Basic validation
  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required.", 400);
  }

  const normalizedEmail = email.toLowerCase().trim();

  // 2. Check if user already exists
  const existingUser = await userRepository.findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new AppError("User with this email already exists.", 400);
  }

  // 3. Create user
  const user = await userRepository.createUser({
    name,
    email: normalizedEmail,
    password,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

module.exports = {
  registerUser,
};
