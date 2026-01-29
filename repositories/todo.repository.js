const prisma = require("../config/prisma");

// ===============================
// Create Todo
// ===============================
const createTodo = async ({ title, completed, userId }) => {
  return prisma.todo.create({
    data: {
      title,
      completed,
      userId,
    },
  });
};

// ===============================
// Get all todos for a user
// ===============================
const getTodosByUser = async (userId) => {
  return prisma.todo.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
};

// ===============================
// Update todo
// ===============================
const updateTodoById = async ({ id, userId, data }) => {
  return prisma.todo.updateMany({
    where: { id, userId },
    data,
  });
};

// ===============================
// Delete todo
// ===============================
const deleteTodoById = async ({ id, userId }) => {
  return prisma.todo.deleteMany({
    where: { id, userId },
  });
};

module.exports = {
  createTodo,
  getTodosByUser,
  updateTodoById,
  deleteTodoById,
};
