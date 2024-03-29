const { check } = require("express-validator");

exports.userSignupValidator = [
  //check("name").not().isEmpty().withMessage("Name is required"),

  //check("role").not().isEmpty().withMessage("role is required"),
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least  6 characters long"),
];

exports.userSigninValidator = [
  check("email").isEmail().withMessage("Must be a valid email address"),
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least  6 characters long"),
];
