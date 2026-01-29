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

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management APIs
 */

/**
 * @swagger
 * /todos:
 *   post:
 *     summary: Create a new todo
 *     tags: [Todos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - completed
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Todo created successfully
 */
router.post("/", protect, validate(addTodoSchema), addTodo);

/**
 * @swagger
 * /todos:
 *   get:
 *     summary: Get all todos for the logged-in user
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: Todos fetched successfully
 */
router.get("/", protect, getTodos);

/**
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Update a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Todo updated successfully
 */
router.put(
  "/:id",
  protect,
  validate(idParamSchema, "params"),
  validate(updateTodoSchema),
  updateTodo,
);

/**
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Todo ID
 *     responses:
 *       200:
 *         description: Todo deleted successfully
 */
router.delete("/:id", protect, validate(idParamSchema, "params"), deleteTodo);

module.exports = router;
