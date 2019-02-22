const {addUser, getUserBasedOnToken, userlogin, logout} = require('./../controllers/User');
const express = require("express");
const {authenticate} = require('./../middleware/authenticate');

var users = express.Router();
users.route("/users").post(addUser);
users.route("/users/login").post(userlogin);

var usersMe = express.Router();
usersMe.use(authenticate);
usersMe.get("/users/me",getUserBasedOnToken);
usersMe.route("/users/me/token").delete(logout);


module.exports = [users,usersMe];