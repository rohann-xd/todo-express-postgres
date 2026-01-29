const catchAsync = require("../middlewares/catchAsync");
const sendResponse = require("../utils/responseHandler");
const todoService = require("../services/todo.service");
const { AppError } = require("../middlewares/errorHandler");

// ===============================
// Add Todo
// ===============================
const addTodo = catchAsync(async (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    throw new AppError("Request body is required.", 400);
  }

  const { title, completed } = req.body || {};
  if (!title || String(title).trim() === "") {
    throw new AppError("Title is required.", 400);
  }

  const userId = req.user && req.user.id;
  if (!userId) {
    throw new AppError("User not authenticated.", 401);
  }

  const todo = await todoService.addTodo({
    title,
    completed,
    userId,
  });

  return sendResponse(res, 201, true, "Todo added successfully", { todo });
});

// ===============================
// Get Todos
// ===============================
const getTodos = catchAsync(async (req, res) => {
  const userId = req.user && req.user.id;
  if (!userId) {
    throw new AppError("User not authenticated.", 401);
  }

  const todos = await todoService.getTodos(userId);

  return sendResponse(res, 200, true, "Todos fetched successfully", { todos });
});

// ===============================
// Update Todo
// ===============================
const updateTodo = catchAsync(async (req, res) => {
  const { id } = req.params || {};
  if (!id) {
    throw new AppError("Todo id is required.", 400);
  }

  if (!req.body || typeof req.body !== "object") {
    throw new AppError("Request body is required.", 400);
  }

  const { title, completed } = req.body || {};
  if (title === undefined && completed === undefined) {
    throw new AppError("At least one of title or completed must be provided.", 400);
  }

  const userId = req.user && req.user.id;
  if (!userId) {
    throw new AppError("User not authenticated.", 401);
  }

  await todoService.updateTodo({
    id,
    userId,
    title,
    completed,
  });

  return sendResponse(res, 200, true, "Todo updated successfully");
});

// ===============================
// Delete Todo
// ===============================
const deleteTodo = catchAsync(async (req, res) => {
  const { id } = req.params || {};
  if (!id) {
    throw new AppError("Todo id is required.", 400);
  }

  const userId = req.user && req.user.id;
  if (!userId) {
    throw new AppError("User not authenticated.", 401);
  }

  await todoService.deleteTodo({ id, userId });

  return sendResponse(res, 200, true, "Todo deleted successfully");
});

module.exports = {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
