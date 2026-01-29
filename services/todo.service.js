const { AppError } = require("../middlewares/errorHandler");
const todoRepository = require("../repositories/todo.repository");

// ===============================
// Add Todo
// ===============================
const addTodo = async ({ title, completed, userId }) => {
  if (!title || title.trim().length === 0) {
    throw new AppError("Todo title is required.", 400);
  }
  if (completed === undefined) {
    completed = false;
  } else if (typeof completed !== "boolean") {
    throw new AppError("Completed must be a boolean value.", 400);
  }

  return todoRepository.createTodo({
    title: title.trim(),
    completed,
    userId,
  });
};

// ===============================
// Get Todos
// ===============================
const getTodos = async (userId) => {
  return todoRepository.getTodosByUser(userId);
};

// ===============================
// Update Todo
// ===============================
const updateTodo = async ({ id, userId, title, completed }) => {
  const data = {};

  if (title !== undefined) {
    if (title.trim().length === 0) {
      throw new AppError("Todo title cannot be empty.", 400);
    }
    data.title = title.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      throw new AppError("Completed must be a boolean value.", 400);
    }
    data.completed = completed;
  }

  if (Object.keys(data).length === 0) {
    throw new AppError("Nothing to update.", 400);
  }

  const result = await todoRepository.updateTodoById({
    id,
    userId,
    data,
  });

  if (result.count === 0) {
    throw new AppError("Todo not found or access denied.", 404);
  }

  return true;
};

// ===============================
// Delete Todo
// ===============================
const deleteTodo = async ({ id, userId }) => {
  const result = await todoRepository.deleteTodoById({ id, userId });

  if (result.count === 0) {
    throw new AppError("Todo not found or access denied.", 404);
  }

  return true;
};

module.exports = {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
};
