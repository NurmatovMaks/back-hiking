const router = require("express").Router();
const userController = require("./../controllers/user-controller");

const { body } = require("express-validator");
console.log("qwe");
router.post(
  "/signup",
  body("email").isEmail(),
  body("password")
    .isLength({ min: 3, max: 30 })
    .withMessage("must be at least 3 chars long"),
  userController.signup
);
router.post("/login", userController.login);
router.get("/", userController.getAll);
module.exports = router;
