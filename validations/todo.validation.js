const Joi = require("joi");

// Validate POST /todos body
const addTodoSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    "string.base": "Title must be a string",
    "string.empty": "Title is required",
    "any.required": "Title is required",
  }),
  completed: Joi.boolean().optional(),
});

// Validate PUT /todos/:id body
const updateTodoSchema = Joi.object({
  title: Joi.string().trim().min(1).messages({
    "string.base": "Title must be a string",
    "string.empty": "Title cannot be empty",
  }),
  completed: Joi.boolean().messages({
    "boolean.base": "Completed must be a boolean",
  }),
}).or("title", "completed").messages({
  "object.missing": "At least one of title or completed must be provided",
});

// Validate :id param (numeric or uuid)
const idParamSchema = Joi.object({
  id: Joi.alternatives()
    .try(Joi.string().uuid(), Joi.number().integer().positive(), Joi.string().regex(/^[0-9]+$/))
    .required()
    .messages({
      "any.required": "Todo id is required",
      "string.pattern.base": "Todo id must be a numeric string or UUID",
    }),
});

module.exports = {
  addTodoSchema,
  updateTodoSchema,
  idParamSchema,
};
