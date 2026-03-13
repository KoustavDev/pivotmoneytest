import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();
const userController = new UserController();

// Register a new user with BSE StAR MF 2.0
// POST /api/user/signup
router.post("/signup", userController.signup);

export default router;
