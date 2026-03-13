import express from "express";
import SchemeController from "../controllers/schemeController.js";

const router = express.Router();
const schemeController = new SchemeController();

// GET /api/scheme/details/:schemeCode
router.get("/details/:schemeCode", schemeController.getSchemeDetails);

export default router;
