// routes/todos.routes.js
const express = require("express");
const router = express.Router();
const { validate } = require("../middlewares/validator.js");

const { protect } = require("../middlewares/auth.middleware");

const {
  addTodoSchema,
  updateTodoSchema,
  idParamSchema,
} = require("../validations/todo.validation");

const {
  addTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

// Protected Routes
router.post("/", protect, validate(addTodoSchema), addTodo);
router.get("/", protect, getTodos);
router.put("/:id", protect, validate(idParamSchema, "params"), validate(updateTodoSchema), updateTodo);
router.delete("/:id", protect, validate(idParamSchema, "params"), deleteTodo);

module.exports = router;
