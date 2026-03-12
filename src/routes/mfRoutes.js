import express from "express";
import MutualFundController from "../controllers/mfController.js";

const router = express.Router();
const mfController = new MutualFundController();

// Search mutual funds
// GET /api/mf/search?q={query}
router.get("/search", mfController.searchMutualFunds);

// Get latest NAV for a scheme
// GET /api/mf/:schemeCode/latest
router.get("/:schemeCode/latest", mfController.getLatestNAV);

// Get historical NAV for a scheme (additional feature for date ranges)
// GET /api/mf/:schemeCode/historical?startDate={date}&endDate={date}
router.get("/:schemeCode/historical", mfController.getHistoricalNAV);

export default router;
