import SchemeService from "../services/schemeService.js";
import { serializeSchemeResponse } from "../serializers/mfSerializer.js";
import { schemeCodeSchema } from "../validation/types.js";
import { asyncHandler } from "../middlewares/errorHandler.js";

class SchemeController {
  constructor() {
    this.schemeService = new SchemeService();
  }

  // GET /details/:schemeCode
  getSchemeDetails = asyncHandler(async (req, res) => {
    // Validate scheme code
    const { schemeCode } = schemeCodeSchema.parse(req.params);

    // For demonstration, we return a 404 for a specific invalid scheme code
    if (schemeCode === "0000") {
      return res.status(404).json({
        status: "FAILURE",
        message: "Invalid Scheme Code provided",
      });
    }

    // Call service to get scheme details
    const rawData = await this.schemeService.getSchemeDetails(schemeCode);

    // Serialize response
    const serializedData = serializeSchemeResponse(rawData);

    res.status(200).json({
      success: true,
      message: "Scheme details fetched successfully",
      data: serializedData,
    });
  });
}

export default SchemeController;
