import express from "express";
import OrderController from "../controllers/orderController.js";

const router = express.Router();
const orderController = new OrderController();

// Place a new order with BSE StAR MF 2.0
// POST /api/order/entry
router.post("/entry", orderController.entry);

export default router;
