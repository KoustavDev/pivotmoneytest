import MutualFundService from "../services/mfService.js";
import {
  serializeSearchResults,
  serializeLatestNAV,
  serializeHistoricalNAV,
} from "../serializers/mfSerializer.js";
import {
  searchQuerySchema,
  schemeCodeSchema,
  dateRangeSchema,
} from "../validation/types.js";
import { asyncHandler, AppError } from "../middlewares/errorHandler.js";

class MutualFundController {
  constructor() {
    this.mfService = new MutualFundService();
  }

  // Search mutual funds
  // GET /search?q={query}

  searchMutualFunds = asyncHandler(async (req, res) => {
    // Validate input
    const { q } = searchQuerySchema.parse(req.query);

    // Call service
    const rawData = await this.mfService.searchMutualFunds(q);

    // Serialize response
    const serializedData = serializeSearchResults(rawData);

    res.status(200).json({
      success: true,
      message: "Search completed successfully",
      data: serializedData,
      count: serializedData.length,
    });
  });

  // Get latest NAV for a scheme
  // GET /:schemeCode/latest

  getLatestNAV = asyncHandler(async (req, res) => {
    // Validate scheme code
    const { schemeCode } = schemeCodeSchema.parse(req.params);

    // Call service
    const rawData = await this.mfService.getLatestNAV(schemeCode);

    // Serialize response
    const serializedData = serializeLatestNAV(rawData);

    res.status(200).json({
      success: true,
      message: "Latest NAV fetched successfully",
      data: serializedData,
    });
  });

  // Get historical NAV for a scheme with optional date range
  // GET /:schemeCode/historical?startDate={date}&endDate={date}

  getHistoricalNAV = asyncHandler(async (req, res) => {
    // Validate scheme code and date range
    const { schemeCode } = schemeCodeSchema.parse(req.params);
    const { startDate, endDate } = dateRangeSchema.parse(req.query);

    // Validate date range logic
    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      throw new AppError("Start date cannot be greater than end date", 400);
    }

    // Call service
    const rawData = await this.mfService.getHistoricalNAV(
      schemeCode,
      startDate,
      endDate,
    );

    // Serialize response
    const serializedData = serializeHistoricalNAV(rawData);

    res.status(200).json({
      success: true,
      message: "Historical NAV data fetched successfully",
      data: serializedData,
      count: serializedData.data.length,
    });
  });
}

export default MutualFundController;
