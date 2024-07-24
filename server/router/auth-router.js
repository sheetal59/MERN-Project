// In express.js, express.Router() is a mini express application without all the server configurations but with the ability
// to define routes, middleware, and even have its own set of route handlers.
//It allows you to modulazrize your routes and middleware to keep your code organized and maintainable.

const express = require("express");
const router = express.Router();
const authcontrollers = require("../controllers/auth-controllers");
const schema = require("../validators/auth-validator");
const validate = require("../middlewares/validate-middleware");
const authMiddleware = require("../middlewares/auth-middleware");

router.route("/").get(authcontrollers.home);
router.route('/register').post(validate(schema.signupSchema), authcontrollers.register);
router.route("/login").post(validate(schema.loginSchema),authcontrollers.login);

router.route("/user").get(authMiddleware, authcontrollers.user);

module.exports = router;