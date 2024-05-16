const express = require("express");
const router = express.Router();
const userControllers = require("../controllers/userControllers");

router.post("/login", userControllers.login);
router.post("/register", userControllers.register);
router.post("/logout", userControllers.logout);
router.get("/users", userControllers.getAllUsers);
router.delete("/users/:id", userControllers.deleteUser);
router.get("/user", userControllers.getUserInfo);

router.put("/users/:id", userControllers.updateUser);


module.exports = router;
