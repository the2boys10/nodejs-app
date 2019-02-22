const {createTodo, getTodos, getTodo, deleteTodo, updateTodo} = require('./../controllers/Todo');
const express = require("express");
const {authenticate} = require('./../middleware/authenticate');

var todos = express.Router();
todos.use(authenticate);
todos.route("/todos").post(createTodo).get(getTodos);
todos.route("/todos/:id").get(getTodo).delete(deleteTodo).patch(updateTodo);


module.exports = [todos];
